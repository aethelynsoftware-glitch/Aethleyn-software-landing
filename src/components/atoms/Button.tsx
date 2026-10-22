import type { ComponentPropsWithRef, ReactNode } from "react"
import { Link } from "react-router"
import Icon from "./Icon"

type SharedProps = {
  children: ReactNode
  variant?: "primary" | "secondary" | "light" | "plain"
  arrow?: boolean
  arrowSize?: number
}

type LinkButtonProps = SharedProps & Omit<ComponentPropsWithRef<typeof Link>, keyof SharedProps | "type" | "disabled" | "form" | "formAction"> & {
  type?: never
  disabled?: never
  form?: never
  formAction?: never
}

type NativeButtonProps = SharedProps & Omit<ComponentPropsWithRef<"button">, keyof SharedProps> & {
  to?: never
}

export type ButtonProps = LinkButtonProps | NativeButtonProps

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = props.to === undefined ? "plain" : "primary",
    arrow = variant !== "plain",
    arrowSize = 18,
    className = "",
    ...rest
  } = props
  const classes = [
    variant === "plain" ? "" : `button button-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const content =
    variant === "plain" && !arrow ? (
      children
    ) : (
      <>
        <span>{children}</span>
        {arrow && <Icon name="arrow" size={arrowSize} />}
      </>
    )
  if (rest.to !== undefined) {
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" {...rest} className={classes}>
      {content}
    </button>
  )
}
