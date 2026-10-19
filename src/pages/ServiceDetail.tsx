import { Link, Navigate, useParams } from "react-router"
import Button, { TextLink } from "../components/ui/Button"
import { ArchitectureVisual, SystemVisual } from "../components/visuals/Visuals"
import { services } from "../data/site"
import { Icon } from "../components/ui/Icons"

export default function ServiceDetail() {
  const { serviceSlug } = useParams()
  const service = services.find((s) => s.slug === serviceSlug)
  if (!service) return <Navigate to="/servicios" replace />
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 2)
  return (
    <>
      <section className={`inner-hero detail-hero kind-${service.kind}`}>
        <div className="container inner-hero-grid">
          <div>
            <div className="breadcrumbs">
              <Link to="/servicios">Servicios</Link>
              <Icon name="chevron" size={14} />
              <span>{service.short}</span>
            </div>
            <span className="eyebrow">
              <i /> {service.number} · {service.short}
            </span>
            <h1>{service.hero}</h1>
            <p>{service.lead}</p>
            <Button to="/contacto">Consultar sobre este servicio</Button>
          </div>
          <SystemVisual kind={service.kind} />
        </div>
      </section>
      <section className="service-intro-strip">
        <div className="container">
          <strong>
            Una solución útil empieza por definir bien el problema.
          </strong>
          <p>
            El alcance, la arquitectura y la implementación se adaptan al
            contexto de cada organización.
          </p>
        </div>
      </section>
      <section className="service-sections section light-section">
        <div className="container">
          {service.sections.map((section, i) => (
            <article key={section.title}>
              <span>0{i + 1}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="service-architecture dark-section section">
        <div className="container">
          <div className="section-head light">
            <div>
              <span className="section-number">CRITERIO TÉCNICO</span>
              <h2>
                La estructura correcta
                <br />
                para el contexto correcto.
              </h2>
            </div>
            <p>
              No partimos de una arquitectura cerrada. Evaluamos usuarios,
              datos, integraciones y evolución esperada antes de decidir.
            </p>
          </div>
          <ArchitectureVisual />
        </div>
      </section>
      <section className="related section">
        <div className="container">
          <span className="section-number">SERVICIOS RELACIONADOS</span>
          <h2>Una visión integral de la solución.</h2>
          <div className="related-grid">
            {related.map((x) => (
              <article key={x.slug}>
                <span>{x.number}</span>
                <h3>{x.short}</h3>
                <p>{x.description}</p>
                <TextLink to={`/servicios/${x.slug}`}>
                  Explorar servicio
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="context-cta">
        <div className="container">
          <div>
            <span>¿TIENES UN RETO RELACIONADO?</span>
            <h2>Conversemos sobre el contexto de tu proyecto.</h2>
          </div>
          <Button to="/contacto">Solicitar una consulta</Button>
        </div>
      </section>
    </>
  )
}
