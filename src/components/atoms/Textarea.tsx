import type { ComponentPropsWithRef } from "react"

export default function Textarea({
  className = "",
  ...props
}: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      {...props}
      className={["form-control", className].filter(Boolean).join(" ")}
    />
  )
}
