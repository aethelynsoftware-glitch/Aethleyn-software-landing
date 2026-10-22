import { Link } from "react-router"
import Brand from "../molecules/Brand"
import Icon from "../atoms/Icon"
import { mainNav, services } from "../../data/site"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <Brand light />
          <p>
            Ingeniería de software y soluciones digitales diseñadas para las
            necesidades reales de cada organización.
          </p>
        </div>
        <div>
          <h3>Explorar</h3>
          {mainNav.slice(0, 5).map((x) => (
            <Link key={x.to} to={x.to}>
              {x.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Servicios</h3>
          {services.map((x) => (
            <Link key={x.slug} to={`/servicios/${x.slug}`}>
              {x.short}
            </Link>
          ))}
        </div>
        <div>
          <h3>Contacto</h3>
          <p>Canales directos disponibles próximamente.</p>
          <Link className="footer-contact" to="/contacto">
            Iniciar una conversación <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} Aethelyn Software</span>
        <div>
          <span>Aviso legal</span>
          <span>Privacidad</span>
        </div>
      </div>
    </footer>
  )
}
