import { Link } from "react-router"
import { Icon } from "./Icons"

export default function Button({
  to,
  children,
  variant = "primary",
}: {
  to: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "light"
}) {
  return (
    <Link className={`button button-${variant}`} to={to}>
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </Link>
  )
}

export function TextLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <Icon name="arrow" size={17} />
    </Link>
  )
}
