import { useState } from "react"
import type { FormEvent } from "react"
import ContactForm from "../components/organisms/ContactForm"
import { submitContactRequest } from "../features/contact/services/contact.service"
import { ContactRequestError } from "../features/contact/types/contact.types"

export default function Contact() {
  const [notice, setNotice] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setNotice("")
    setFieldErrors({})
    const form = e.currentTarget
    const data = new FormData(form)
    setIsSubmitting(true)
    try {
      const result = await submitContactRequest({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        service: String(data.get("service") ?? ""),
        budget: String(data.get("budget") ?? ""),
        preference: String(data.get("preference") ?? ""),
        description: String(data.get("description") ?? ""),
        privacyConsent: data.get("privacyConsent") === "on",
        website: String(data.get("website") ?? ""),
      })
      setNotice(result.message)
      form.reset()
    } catch (error) {
      if (error instanceof ContactRequestError) {
        setNotice(error.message)
        setFieldErrors(error.fields ?? {})
      } else {
        setNotice("No se pudo procesar la solicitud. Inténtalo de nuevo.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="contact-page">
        <div className="contact-glow" />
        <div className="container contact-grid">
          <div className="contact-intro">
            <span className="breadcrumb">AETHELYN / CONTACTO</span>
            <h1>
              Cuéntanos qué necesitas <em>construir.</em>
            </h1>
            <p>
              Explícanos el desafío que enfrenta tu negocio. Podemos comenzar
              por comprender el problema, evaluar las necesidades y explorar
              posibles soluciones.
            </p>
            <div className="contact-steps">
              <span>CÓMO EMPEZAR</span>
              {[
                ["01", "Describe el contexto"],
                ["02", "Revisamos las necesidades"],
                ["03", "Definimos el siguiente paso"],
              ].map(([n, t]) => (
                <div key={n}>
                  <b>{n}</b>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-heading">
              <span>01 — SOLICITUD DE CONTACTO</span>
              <h2>Hablemos de tu proyecto.</h2>
              <p>
                Completa la información esencial para que podamos evaluar tu
                consulta y responderte.
              </p>
            </div>
            {notice && (
              <div className="form-notice" role="status" aria-live="polite">
                <p>{notice}</p>
              </div>
            )}
            <ContactForm
              onSubmit={handleSubmit}
              fieldErrors={fieldErrors}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </section>
    </>
  )
}
