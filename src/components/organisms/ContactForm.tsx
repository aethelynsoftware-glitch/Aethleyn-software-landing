import { useEffect, useRef } from "react"
import type { FormEventHandler } from "react"
import Button from "../atoms/Button"
import Input from "../atoms/Input"
import Select from "../atoms/Select"
import Textarea from "../atoms/Textarea"
import FormField from "../molecules/FormField"
import CheckboxField from "../molecules/CheckboxField"
import {
  CONTACT_BUDGETS,
  CONTACT_PREFERENCES,
  CONTACT_SERVICES,
} from "../../features/contact/schemas/contact.schema"

type ContactFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
  fieldErrors: Record<string, string>
  isSubmitting: boolean
}

export default function ContactForm({
  onSubmit,
  fieldErrors,
  isSubmitting,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (Object.keys(fieldErrors).length === 0) return
    formRef.current
      ?.querySelector<HTMLElement>(
        'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]',
      )
      ?.focus()
  }, [fieldErrors])

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <label className="field-label contact-trap" aria-hidden="true">
        No rellenar este campo
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-row">
        <FormField id="name" label="Nombre completo *" error={fieldErrors.name}>
          {(props) => (
            <Input
              {...props}
              name="name"
              required
              autoComplete="name"
              placeholder="Tu nombre"
            />
          )}
        </FormField>
        <FormField
          id="email"
          label="Correo electrónico *"
          error={fieldErrors.email}
        >
          {(props) => (
            <Input
              {...props}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="nombre@empresa.com"
            />
          )}
        </FormField>
      </div>
      <div className="form-row">
        <FormField
          id="company"
          label={
            <>
              Empresa <span>(opcional)</span>
            </>
          }
          error={fieldErrors.company}
        >
          {(props) => (
            <Input
              {...props}
              name="company"
              autoComplete="organization"
              placeholder="Nombre de la organización"
            />
          )}
        </FormField>
        <FormField
          id="service"
          label="Servicio de interés *"
          error={fieldErrors.service}
        >
          {(props) => (
            <Select {...props} name="service" required defaultValue="">
              <option value="" disabled>
                Selecciona un servicio
              </option>
              {CONTACT_SERVICES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </Select>
          )}
        </FormField>
      </div>
      <div className="form-row">
        <FormField
          id="budget"
          label={
            <>
              Presupuesto estimado <span>(opcional)</span>
            </>
          }
          error={fieldErrors.budget}
        >
          {(props) => (
            <Select {...props} name="budget" defaultValue="">
              <option value="">Por definir</option>
              {CONTACT_BUDGETS.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </Select>
          )}
        </FormField>
        <FormField
          id="preference"
          label={
            <>
              Preferencia de contacto <span>(opcional)</span>
            </>
          }
          error={fieldErrors.preference}
        >
          {(props) => (
            <Select {...props} name="preference" defaultValue="">
              <option value="">Sin preferencia</option>
              {CONTACT_PREFERENCES.map((preference) => (
                <option key={preference}>{preference}</option>
              ))}
            </Select>
          )}
        </FormField>
      </div>
      <FormField
        id="description"
        label="Descripción del proyecto *"
        error={fieldErrors.description}
      >
        {(props) => (
          <Textarea
            {...props}
            name="description"
            required
            minLength={20}
            rows={5}
            placeholder="Cuéntanos qué problema quieres resolver, quién utilizará la solución y qué herramientas usas actualmente."
          />
        )}
      </FormField>
      <CheckboxField
        id="privacyConsent"
        name="privacyConsent"
        required
        error={fieldErrors.privacyConsent}
        label="Acepto que la información se utilice para responder a esta solicitud. *"
      />
      <Button
        className="submit-button"
        type="submit"
        disabled={isSubmitting}
        arrow
        arrowSize={20}
      >
        {isSubmitting ? "Enviando solicitud…" : "Enviar consulta"}
      </Button>
      <small className="form-caption">
        Tus datos se utilizarán para responder a esta solicitud.
      </small>
    </form>
  )
}
