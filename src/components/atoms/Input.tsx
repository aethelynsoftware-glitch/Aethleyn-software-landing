import type { ComponentPropsWithRef } from "react"

export default function Input({
  className = "",
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <input
      {...props}
      className={["form-control", className].filter(Boolean).join(" ")}
    />
  )
}
