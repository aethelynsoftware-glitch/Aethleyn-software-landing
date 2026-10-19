import type { ContactFormValues } from "../types/contact.types"

export const CONTACT_BUDGETS = [
  "Menos de 5.000 €",
  "5.000 € — 15.000 €",
  "15.000 € — 40.000 €",
  "Más de 40.000 €",
] as const

export const CONTACT_PREFERENCES = [
  "Correo electrónico",
  "Videollamada",
  "Teléfono (al configurarlo)",
] as const

export const CONTACT_SERVICES = [
  "Software a medida",
  "Aplicaciones web",
  "Automatización e integración",
  "Datos y dashboards",
] as const

export function validateContactForm(values: ContactFormValues) {
  const fields: Record<string, string> = {}
  if (!values.name.trim()) fields.name = "Introduce tu nombre."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    fields.email = "Introduce un correo válido."
  }
  if (!CONTACT_SERVICES.includes(values.service as (typeof CONTACT_SERVICES)[number])) {
    fields.service = "Selecciona un servicio válido."
  }
  if (values.budget && !CONTACT_BUDGETS.includes(values.budget as (typeof CONTACT_BUDGETS)[number])) {
    fields.budget = "Selecciona un presupuesto válido."
  }
  if (values.preference && !CONTACT_PREFERENCES.includes(values.preference as (typeof CONTACT_PREFERENCES)[number])) {
    fields.preference = "Selecciona una preferencia válida."
  }
  if (values.description.trim().length < 20) {
    fields.description = "Describe tu proyecto con al menos 20 caracteres."
  }
  if (!values.privacyConsent) fields.privacyConsent = "Debes aceptar el uso de los datos para responder a la solicitud."
  return fields
}
