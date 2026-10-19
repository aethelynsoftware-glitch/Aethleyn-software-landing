import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import Brand from "../brand/Brand"
import Button from "../ui/Button"
import { Icon } from "../ui/Icons"
import { mainNav, services } from "../../data/site"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key === "Tab") {
        const panel = document.querySelector<HTMLElement>(".menu-panel")
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
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-shell">
          <Brand light />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/servicios">Servicios</NavLink>
            <NavLink to="/metodologia">Soluciones</NavLink>
            <NavLink to="/proyectos">Proyectos</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
          </nav>
          <div className="nav-actions">
            <Link to="/contacto" className="nav-cta">
              Hablemos de tu proyecto
            </Link>
            <button
              ref={openerRef}
              className="menu-trigger"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`menu-overlay ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) setOpen(false)
        }}
      >
        <div
          className="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <div className="menu-top">
            <Brand light />
            <button
              ref={closeRef}
              className="menu-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <Icon name="close" />
            </button>
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
              <button
                className="services-toggle"
                onClick={() => setServiceOpen(!serviceOpen)}
                aria-expanded={serviceOpen}
              >
                <span className="menu-label">Servicios</span>
                <Icon name="chevron" className={serviceOpen ? "rotated" : ""} />
              </button>
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
    </>
  )
}
