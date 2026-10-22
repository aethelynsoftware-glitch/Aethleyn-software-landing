import type { ComponentPropsWithRef, ReactNode } from "react"
import Input from "../atoms/Input"

type CheckboxFieldProps = Omit<ComponentPropsWithRef<"input">, "type" | "children" | "id"> & {
  id: string
  label: ReactNode
  error?: string
}

export default function CheckboxField({
  id,
  label,
  error,
  ...props
}: CheckboxFieldProps) {
  return (
    <>
      <label className="field-label checkbox" htmlFor={id}>
        <Input
          {...props}
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span>{label}</span>
      </label>
      {error && (
        <small id={`${id}-error`} className="field-error" role="alert">
          {error}
        </small>
      )}
    </>
  )
}
