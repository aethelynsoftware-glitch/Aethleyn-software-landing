import type { ReactNode } from "react"

type InnerHeroProps = {
  className: string
  intro: ReactNode
  title: ReactNode
  description: ReactNode
  action: ReactNode
  visual: ReactNode
}

export default function InnerHero({
  className,
  intro,
  title,
  description,
  action,
  visual,
}: InnerHeroProps) {
  return (
    <section className={`inner-hero ${className}`}>
      <div className="container inner-hero-grid">
        <div>
          {intro}
          <h1>{title}</h1>
          <p>{description}</p>
          {action}
        </div>
        {visual}
      </div>
    </section>
  )
}
