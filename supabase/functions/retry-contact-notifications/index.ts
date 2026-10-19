import { corsHeaders, jsonResponse } from "../_shared/http.ts"
import { sendNotification } from "../_shared/email.ts"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? ""
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
const RETRY_SECRET = Deno.env.get("NOTIFICATION_RETRY_SECRET") ?? ""

async function mark(outboxId: string, result: { ok: boolean; messageId?: string; error?: string }) {
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
        ? { status: "sent", sent_at: new Date().toISOString(), provider_message_id: result.messageId ?? null, last_error: null }
        : { last_error: result.error ?? "notification_failed" }),
    },
  )
  if (!response.ok) console.error("outbox_update_failed", response.status)
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") {
    return jsonResponse({ success: false, message: "Método no permitido.", code: "METHOD_NOT_ALLOWED" }, 405, corsHeaders(request.headers.get("origin")))
  }
  if (!RETRY_SECRET || request.headers.get("x-retry-secret") !== RETRY_SECRET) {
    return jsonResponse({ success: false, message: "No autorizado.", code: "UNAUTHORIZED" }, 401, corsHeaders(request.headers.get("origin")))
  }
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return jsonResponse({ success: false, message: "Servicio no disponible.", code: "SERVICE_UNAVAILABLE" }, 503, corsHeaders(request.headers.get("origin")))
  }

  const claimResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/claim_contact_notification`, {
    method: "POST",
    headers: { apikey: SERVICE_ROLE_KEY, Authorization: `Bearer ${SERVICE_ROLE_KEY}`, "Content-Type": "application/json" },
    body: "{}",
  })
  if (!claimResponse.ok) {
    console.error("notification_claim_failed", claimResponse.status)
    return jsonResponse({ success: false, message: "No se pudo procesar la cola.", code: "QUEUE_FAILED" }, 503, corsHeaders(request.headers.get("origin")))
  }
  const rows = await claimResponse.json() as Array<Record<string, string | null>>
  if (!rows.length) return jsonResponse({ success: true, processed: false }, 200, corsHeaders(request.headers.get("origin")))

  const row = rows[0]
  const result = await sendNotification(String(row.outbox_id), {
    requestId: String(row.request_id),
    createdAt: String(row.created_at),
    name: String(row.name),
    email: String(row.email),
    company: String(row.company ?? ""),
    service: String(row.service),
    budget: String(row.budget ?? ""),
    preference: String(row.preference ?? ""),
    description: String(row.description),
    privacyConsent: true,
  })
  await mark(String(row.outbox_id), result.ok
    ? { ok: true, messageId: result.messageId }
    : { ok: false, error: result.error })
  return jsonResponse({ success: true, processed: true, notificationSent: result.ok }, 200, corsHeaders(request.headers.get("origin")))
})
