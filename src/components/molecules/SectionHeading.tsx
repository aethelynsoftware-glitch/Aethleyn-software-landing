import type { ReactNode } from "react"

type SectionHeadingProps = {
  label: ReactNode
  title: ReactNode
  light?: boolean
  children?: ReactNode
}

export default function SectionHeading({
  label,
  title,
  light = false,
  children,
}: SectionHeadingProps) {
  return (
    <div className={light ? "section-head light" : "section-head"}>
      <div>
        <span className="section-number">{label}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}
