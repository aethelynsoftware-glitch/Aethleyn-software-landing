import { env } from "../../../config/env"
import type {
  ContactErrorResponse,
  ContactFormValues,
  ContactSuccessResponse,
} from "../types/contact.types"
import { ContactRequestError } from "../types/contact.types"
import { validateContactForm } from "../schemas/contact.schema"

export async function submitContactRequest(
  values: ContactFormValues,
): Promise<ContactSuccessResponse> {
  const fields = validateContactForm(values)
  if (Object.keys(fields).length > 0) {
    throw new ContactRequestError("Revisa los datos del formulario.", "VALIDATION_ERROR", fields)
  }
  if (!env.supabaseUrl || !env.supabasePublishableKey) {
    throw new ContactRequestError(
      "El formulario todavía no está configurado. Tus datos no se han enviado.",
      "NOT_CONFIGURED",
    )
  }

  let response: Response
  try {
    response = await fetch(`${env.supabaseUrl}/functions/v1/submit-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: env.supabasePublishableKey,
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        company: values.company,
        service: values.service,
        budget: values.budget,
        preference: values.preference,
        description: values.description,
        privacyConsent: values.privacyConsent,
        website: values.website,
      }),
    })
  } catch {
    throw new ContactRequestError(
      "No se pudo conectar con el servicio. Comprueba tu conexión e inténtalo de nuevo.",
      "NETWORK_ERROR",
    )
  }

  let body: ContactSuccessResponse | ContactErrorResponse
  try {
    body = (await response.json()) as ContactSuccessResponse | ContactErrorResponse
  } catch {
    throw new ContactRequestError("El servicio devolvió una respuesta inesperada.", "INVALID_RESPONSE")
  }

  if (!response.ok || !body.success) {
    const error = body as ContactErrorResponse
    throw new ContactRequestError(
      error.message || "No se pudo enviar la solicitud.",
      error.code || "REQUEST_FAILED",
      error.fields,
    )
  }

  return body
}
