import { corsHeaders, jsonResponse, originIsAllowed } from "../_shared/http.ts"
import { normalizeAndValidate } from "./validation.ts"
import { sendNotification } from "../_shared/email.ts"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? ""
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
const MAX_BODY_BYTES = 16 * 1024

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function updateOutbox(outboxId: string, result: { ok: boolean; messageId?: string; error?: string }) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/contact_notification_outbox?id=eq.${encodeURIComponent(outboxId)}`,
    {
      method: "PATCH",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(result.ok
        ? { status: "sent", attempts: 1, last_attempt_at: new Date().toISOString(), sent_at: new Date().toISOString(), provider_message_id: result.messageId ?? null, last_error: null }
        : { last_attempt_at: new Date().toISOString(), last_error: result.error ?? "notification_failed" }),
    },
  )
  if (!response.ok) console.error("outbox_update_failed", response.status)
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin")
  if (!originIsAllowed(origin)) {
    return jsonResponse({ success: false, message: "Origen no permitido.", code: "ORIGIN_NOT_ALLOWED" }, 403, corsHeaders(origin))
  }
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }
  if (request.method !== "POST") {
    return jsonResponse({ success: false, message: "Método no permitido.", code: "METHOD_NOT_ALLOWED" }, 405, corsHeaders(origin))
  }
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ success: false, message: "Se requiere application/json.", code: "UNSUPPORTED_MEDIA_TYPE" }, 415, corsHeaders(origin))
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0")
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, message: "La solicitud es demasiado grande.", code: "PAYLOAD_TOO_LARGE" }, 413, corsHeaders(origin))
  }

  let raw: unknown
  try {
    const bodyText = await request.text()
    if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ success: false, message: "La solicitud es demasiado grande.", code: "PAYLOAD_TOO_LARGE" }, 413, corsHeaders(origin))
    }
    raw = JSON.parse(bodyText)
  } catch {
    return jsonResponse({ success: false, message: "El cuerpo JSON no es válido.", code: "INVALID_JSON" }, 400, corsHeaders(origin))
  }

  const validation = normalizeAndValidate(raw)
  if (!validation.ok) {
    return jsonResponse({
      success: false,
      message: "Revisa los datos del formulario.",
      code: "VALIDATION_ERROR",
      fields: validation.fields,
    }, 422, corsHeaders(origin))
  }

  // Honeypot submissions receive a generic success but are never stored or emailed.
  if (validation.value.website) {
    return jsonResponse({ success: true, message: "Tu consulta ha sido recibida correctamente.", requestId: crypto.randomUUID() }, 201, corsHeaders(origin))
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("contact_function_missing_database_configuration")
    return jsonResponse({ success: false, message: "El servicio no está disponible temporalmente.", code: "SERVICE_UNAVAILABLE" }, 503, corsHeaders(origin))
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip") ?? "unknown-client"
  const sourceHash = await sha256(ip)
  const { website: _website, ...payload } = validation.value

  let insertResponse: Response
  try {
    insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_contact_request`, {
      method: "POST",
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload, p_source_hash: sourceHash }),
    })
  } catch {
    return jsonResponse({ success: false, message: "No se pudo registrar la consulta. Inténtalo de nuevo.", code: "PERSISTENCE_UNAVAILABLE" }, 503, corsHeaders(origin))
  }

  if (!insertResponse.ok) {
    const errorText = await insertResponse.text()
    if (errorText.includes("CONTACT_RATE_LIMIT")) {
      return jsonResponse({ success: false, message: "Has enviado varias solicitudes recientemente. Espera unos minutos e inténtalo de nuevo.", code: "RATE_LIMITED" }, 429, corsHeaders(origin))
    }
    console.error("contact_persistence_failed", insertResponse.status)
    return jsonResponse({ success: false, message: "No se pudo registrar la consulta. Inténtalo de nuevo.", code: "PERSISTENCE_FAILED" }, 503, corsHeaders(origin))
  }

  const inserted = await insertResponse.json() as { request_id: string; outbox_id: string }

  // The lead and outbox row are already committed. Mail failure never discards the request.
  const emailResult = await sendNotification(inserted.outbox_id, {
    ...payload,
    requestId: inserted.request_id,
    createdAt: new Date().toISOString(),
  })
  await updateOutbox(inserted.outbox_id, emailResult)

  return jsonResponse({
    success: true,
    message: "Tu consulta ha sido recibida correctamente.",
    requestId: inserted.request_id,
  }, 201, corsHeaders(origin))
})
