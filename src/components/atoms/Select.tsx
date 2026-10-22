import type { ComponentPropsWithRef } from "react"

export default function Select({
  className = "",
  ...props
}: ComponentPropsWithRef<"select">) {
  return (
    <select
      {...props}
      className={["form-control", className].filter(Boolean).join(" ")}
    />
  )
}
