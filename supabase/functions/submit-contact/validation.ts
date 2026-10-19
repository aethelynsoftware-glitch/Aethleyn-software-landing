const SERVICES = new Set([
  "Software a medida",
  "Aplicaciones web",
  "Automatización e integración",
  "Datos y dashboards",
])
const BUDGETS = new Set([
  "Menos de 5.000 €",
  "5.000 € — 15.000 €",
  "15.000 € — 40.000 €",
  "Más de 40.000 €",
])
const PREFERENCES = new Set([
  "Correo electrónico",
  "Videollamada",
  "Teléfono (al configurarlo)",
])
const ALLOWED_KEYS = new Set([
  "name", "email", "company", "service", "budget", "preference",
  "description", "privacyConsent", "website",
])

type ContactPayload = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  preference: string
  description: string
  privacyConsent: boolean
  website: string
}

export function normalizeAndValidate(input: unknown):
  | { ok: true; value: ContactPayload }
  | { ok: false; fields: Record<string, string> } {
  const fields: Record<string, string> = {}
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, fields: { form: "Los datos enviados no son válidos." } }
  }
  const raw = input as Record<string, unknown>
  if (Object.keys(raw).some((key) => !ALLOWED_KEYS.has(key))) {
    return { ok: false, fields: { form: "La solicitud contiene campos no permitidos." } }
  }
  const read = (key: string, max: number): string => {
    const value = raw[key] ?? ""
    if (typeof value !== "string") {
      fields[key] = "El formato del campo no es válido."
      return ""
    }
    const normalized = value.trim().replace(/\s+/g, " ")
    if (normalized.length > max) fields[key] = `No puede superar ${max} caracteres.`
    return normalized
  }

  const name = read("name", 120)
  const email = read("email", 254).toLowerCase()
  const company = read("company", 160)
  const service = read("service", 80)
  const budget = read("budget", 40)
  const preference = read("preference", 60)
  // Preserve paragraph line breaks while normalizing line endings and trailing spaces.
  const descriptionRaw = raw.description ?? ""
  let description = ""
  if (typeof descriptionRaw !== "string") fields.description = "El formato del campo no es válido."
  else {
    description = descriptionRaw.replace(/\r\n?/g, "\n").trim()
    if (description.length > 5000) fields.description = "No puede superar 5000 caracteres."
  }
  const website = read("website", 200)
  const privacyConsent = raw.privacyConsent

  if (!name) fields.name = "Introduce tu nombre."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "Introduce un correo válido."
  if (!SERVICES.has(service)) fields.service = "Selecciona un servicio válido."
  if (budget && !BUDGETS.has(budget)) fields.budget = "Selecciona un presupuesto válido."
  if (preference && !PREFERENCES.has(preference)) fields.preference = "Selecciona una preferencia válida."
  if (description.length < 20) fields.description = "Describe tu proyecto con al menos 20 caracteres."
  if (typeof privacyConsent !== "boolean" || privacyConsent !== true) fields.privacyConsent = "Debes aceptar el uso de los datos para responder a la solicitud."

  if (Object.keys(fields).length > 0) return { ok: false, fields }
  return {
    ok: true,
    value: { name, email, company, service, budget, preference, description, privacyConsent: true, website },
  }
}
