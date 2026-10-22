import type { ComponentProps, ReactNode } from "react"
import { Link } from "react-router"
import Icon from "./Icon"

type TextLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode
}

export default function TextLink({
  children,
  className = "",
  ...props
}: TextLinkProps) {
  return (
    <Link
      {...props}
      className={["text-link", className].filter(Boolean).join(" ")}
    >
      {children}
      <Icon name="arrow" size={17} />
    </Link>
  )
}
