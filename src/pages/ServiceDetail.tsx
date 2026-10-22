import InnerHero from "../components/organisms/InnerHero"
import SectionHeading from "../components/molecules/SectionHeading"
import { Link, Navigate, useParams } from "react-router"
import Button from "../components/atoms/Button"
import TextLink from "../components/atoms/TextLink"
import ArchitectureVisual from "../components/organisms/ArchitectureVisual"
import SystemVisual from "../components/organisms/SystemVisual"
import { services } from "../data/site"
import Icon from "../components/atoms/Icon"

export default function ServiceDetail() {
  const { serviceSlug } = useParams()
  const service = services.find((s) => s.slug === serviceSlug)
  if (!service) return <Navigate to="/servicios" replace />
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 2)
  return (
    <>
      <InnerHero
        className={`detail-hero kind-${service.kind}`}
        intro={
          <>
            <div className="breadcrumbs">
              <Link to="/servicios">Servicios</Link>
              <Icon name="chevron" size={14} />
              <span>{service.short}</span>
            </div>
            <span className="eyebrow">
              <i /> {service.number} · {service.short}
            </span>
          </>
        }
        title={service.hero}
        description={service.lead}
        action={<Button to="/contacto">Consultar sobre este servicio</Button>}
        visual={<SystemVisual kind={service.kind} />}
      />
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
          <SectionHeading
            light
            label={<>CRITERIO TÉCNICO</>}
            title={
              <>
                La estructura correcta
                <br />
                para el contexto correcto.
              </>
            }
          >
            <p>
              No partimos de una arquitectura cerrada. Evaluamos usuarios,
              datos, integraciones y evolución esperada antes de decidir.
            </p>
          </SectionHeading>
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
