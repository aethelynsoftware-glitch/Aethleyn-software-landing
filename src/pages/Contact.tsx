import { FormEvent, useState } from "react"
import { Icon } from "../components/ui/Icons"
import { services } from "../data/site"
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

  const fieldError = (name: string) =>
    fieldErrors[name] ? <small className="field-error" role="alert">{fieldErrors[name]}</small> : null
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
            <div className="contact-channels">
              <h2>Canales directos</h2>
              <div>
                <Icon name="mail" />
                <span>
                  <b>Correo empresarial</b>
                  <small>Disponible al configurar el canal</small>
                </span>
              </div>
              <div>
                <Icon name="globe" />
                <span>
                  <b>Zona de atención</b>
                  <small>Proyectos remotos · ubicación configurable</small>
                </span>
              </div>
              <p>
                WhatsApp y LinkedIn se mostrarán cuando existan canales
                oficiales configurados.
              </p>
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
            <form onSubmit={handleSubmit} noValidate>
              <label className="contact-trap" aria-hidden="true">
                No rellenar este campo
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="form-row">
                <label>
                  Nombre completo *
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  />
                  {fieldErrors.name && <small id="name-error" className="field-error" role="alert">{fieldErrors.name}</small>}
                </label>
                <label>
                  Correo electrónico *
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nombre@empresa.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  />
                  {fieldErrors.email && <small id="email-error" className="field-error" role="alert">{fieldErrors.email}</small>}
                </label>
              </div>
              <div className="form-row">
                <label>
                  Empresa <span>(opcional)</span>
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder="Nombre de la organización"
                  />
                  {fieldError("company")}
                </label>
                <label>
                  Servicio de interés *
                  <select name="service" required defaultValue="">
                    <option value="" disabled>
                      Selecciona un servicio
                    </option>
                    {services.map((s) => (
                      <option key={s.slug}>{s.short}</option>
                    ))}
                  </select>
                  {fieldError("service")}
                </label>
              </div>
              <div className="form-row">
                <label>
                  Presupuesto estimado <span>(opcional)</span>
                  <select name="budget" defaultValue="">
                    <option value="">Por definir</option>
                    <option>Menos de 5.000 €</option>
                    <option>5.000 € — 15.000 €</option>
                    <option>15.000 € — 40.000 €</option>
                    <option>Más de 40.000 €</option>
                  </select>
                  {fieldError("budget")}
                </label>
                <label>
                  Preferencia de contacto <span>(opcional)</span>
                  <select name="preference" defaultValue="">
                    <option value="">Sin preferencia</option>
                    <option>Correo electrónico</option>
                    <option>Videollamada</option>
                    <option>Teléfono (al configurarlo)</option>
                  </select>
                  {fieldError("preference")}
                </label>
              </div>
              <label>
                Descripción del proyecto *
                <textarea
                  name="description"
                  required
                  minLength={20}
                  rows={5}
                  placeholder="Cuéntanos qué problema quieres resolver, quién utilizará la solución y qué herramientas usas actualmente."
                  aria-invalid={Boolean(fieldErrors.description)}
                  aria-describedby={fieldErrors.description ? "description-error" : undefined}
                />
                {fieldErrors.description && <small id="description-error" className="field-error" role="alert">{fieldErrors.description}</small>}
              </label>
              <label className="checkbox">
                <input type="checkbox" name="privacyConsent" required aria-invalid={Boolean(fieldErrors.privacyConsent)} />
                <span>
                  Acepto que la información se utilice para responder a esta
                  solicitud. *
                </span>
              </label>
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Enviando solicitud…" : "Enviar consulta"}</span>
                <Icon name="arrow" />
              </button>
              <small className="form-caption">
                Tus datos se utilizarán para responder a esta solicitud.
              </small>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
