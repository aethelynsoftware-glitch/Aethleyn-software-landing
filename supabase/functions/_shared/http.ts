export function corsHeaders(origin: string | null): Record<string, string> {
  const configured = (Deno.env.get("CONTACT_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean)
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-retry-secret",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
  }
  if (origin && configured.includes(origin.replace(/\/$/, ""))) {
    headers["Access-Control-Allow-Origin"] = origin
  }
  return headers
}

export function originIsAllowed(origin: string | null): boolean {
  if (!origin) return true
  const configured = (Deno.env.get("CONTACT_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean)
  return configured.includes(origin.replace(/\/$/, ""))
}

export function jsonResponse(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers })
}
