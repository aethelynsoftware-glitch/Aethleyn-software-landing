export type NotificationPayload = {
  requestId: string
  createdAt: string
  name: string
  email: string
  company: string
  service: string
  budget: string
  preference: string
  description: string
  privacyConsent: boolean
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;")

export async function sendNotification(
  outboxId: string,
  data: NotificationPayload,
): Promise<{ ok: true; messageId?: string } | { ok: false; error: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY")
  const to = Deno.env.get("CONTACT_NOTIFICATION_EMAIL")
  const from = Deno.env.get("CONTACT_FROM_EMAIL")
  if (!apiKey || !to || !from) {
    console.error("contact_email_not_configured")
    return { ok: false, error: "email_not_configured" }
  }

  const rows = [
    ["Solicitud", data.requestId],
    ["Fecha de recepción", data.createdAt],
    ["Nombre", data.name],
    ["Correo", data.email],
    ["Empresa", data.company || "No indicada"],
    ["Servicio", data.service],
    ["Presupuesto", data.budget || "Por definir"],
    ["Preferencia", data.preference || "Sin preferencia"],
  ]
  const html = `<h2>Nueva solicitud de contacto</h2><table>${rows.map(([label, value]) =>
    `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`
  ).join("")}</table><h3>Descripción del proyecto</h3><p style="white-space:pre-wrap">${escapeHtml(data.description)}</p>`

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": outboxId,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Nueva consulta web: ${data.service}`,
        html,
        text: [
          "Nueva solicitud de contacto",
          ...rows.map(([label, value]) => `${label}: ${value}`),
          "",
          "Descripción:",
          data.description,
        ].join("\n"),
      }),
    })
    if (!response.ok) {
      // Do not log provider response bodies: they may contain submitted data.
      console.error("contact_email_provider_rejected", response.status)
      return { ok: false, error: `provider_http_${response.status}` }
    }
    const result = await response.json() as { id?: string }
    return { ok: true, messageId: result.id }
  } catch {
    console.error("contact_email_network_error")
    return { ok: false, error: "provider_network_error" }
  }
}
