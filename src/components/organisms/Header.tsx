import { useCallback, useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import Brand from "../molecules/Brand"
import Button from "../atoms/Button"
import Icon from "../atoms/Icon"
import NavigationMenu from "./NavigationMenu"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const closeMenu = useCallback(() => setOpen(false), [])

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
            <Button
              ref={openerRef}
              className="menu-trigger"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Icon name="menu" size={22} />
            </Button>
          </div>
        </div>
      </header>
      <NavigationMenu open={open} onClose={closeMenu} openerRef={openerRef} />
    </>
  )
}
