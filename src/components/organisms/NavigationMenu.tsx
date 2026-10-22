import { useEffect, useRef, useState } from "react"
import type { RefObject } from "react"
import { Link, NavLink } from "react-router"
import Brand from "../molecules/Brand"
import Button from "../atoms/Button"
import Icon from "../atoms/Icon"
import { mainNav, services } from "../../data/site"

type NavigationMenuProps = {
  open: boolean
  onClose: () => void
  openerRef: RefObject<HTMLButtonElement | null>
}

export default function NavigationMenu({
  open,
  onClose,
  openerRef,
}: NavigationMenuProps) {
  const [serviceOpen, setServiceOpen] = useState(true)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "Tab") {
        const panel = panelRef.current
        const focusable = panel?.querySelectorAll<HTMLElement>(
          "a,button:not([disabled])",
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
      openerRef.current?.focus()
    }
  }, [open, onClose, openerRef])

  return (
    <div
      className={`menu-overlay ${open ? "is-open" : ""}`}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
      >
        <div className="menu-top">
          <Brand light />
          <Button
            ref={closeRef}
            className="menu-close"
            onClick={() => onClose()}
            aria-label="Cerrar menú"
          >
            <Icon name="close" />
          </Button>
        </div>
        <div className="menu-content">
          <div className="menu-column">
            <span className="menu-label">Explorar</span>
            {mainNav.map((item, i) => (
              <NavLink key={item.to} to={item.to}>
                <em>0{i + 1}</em>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="menu-column services-menu">
            <Button
              className="services-toggle"
              onClick={() => setServiceOpen(!serviceOpen)}
              aria-expanded={serviceOpen}
            >
              <span className="menu-label">Servicios</span>
              <Icon name="chevron" className={serviceOpen ? "rotated" : ""} />
            </Button>
            <div className={serviceOpen ? "submenu is-open" : "submenu"}>
              {services.map((s) => (
                <Link key={s.slug} to={`/servicios/${s.slug}`}>
                  <em>{s.number}</em>
                  <span>
                    {s.short}
                    <small>{s.description}</small>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="menu-bottom">
          <p>¿Tienes un desafío tecnológico?</p>
          <Button to="/contacto">Conversemos sobre tu proyecto</Button>
          <span>Ingeniería de software · Soluciones a medida</span>
        </div>
      </div>
    </div>
  )
}
