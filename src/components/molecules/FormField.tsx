import type { ReactNode } from "react"

export type FieldControlProps = {
  id: string
  "aria-invalid": boolean
  "aria-describedby": string | undefined
}

type FormFieldProps = {
  id: string
  label: ReactNode
  error?: string
  children: (props: FieldControlProps) => ReactNode
}

export default function FormField({
  id,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <label className="field-label" htmlFor={id}>
      {label}
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${id}-error` : undefined,
      })}
      {error && (
        <small id={`${id}-error`} className="field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  )
}
