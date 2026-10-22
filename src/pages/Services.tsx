import InnerHero from "../components/organisms/InnerHero"
import Button from "../components/atoms/Button"
import TextLink from "../components/atoms/TextLink"
import HeroComposition from "../components/organisms/HeroComposition"
import SystemVisual from "../components/organisms/SystemVisual"
import { services } from "../data/site"
import FinalCta from "../components/organisms/FinalCta"

export default function Services() {
  return (
    <>
      <InnerHero
        className="services-hero"
        intro={<span className="breadcrumb">AETHELYN / SERVICIOS</span>}
        title={
          <>
            Soluciones digitales para <em>necesidades reales.</em>
          </>
        }
        description={
          <>
            Desarrollamos herramientas tecnológicas adaptadas a los procesos,
            objetivos y desafíos de cada organización.
          </>
        }
        action={<Button to="/contacto">Consultar un proyecto</Button>}
        visual={<HeroComposition />}
      />
      <section className="services-manifesto">
        <div className="container">
          <span>Diseñamos con contexto.</span>
          <p>
            Combinamos comprensión del negocio, experiencia de usuario e
            ingeniería para construir soluciones útiles y sostenibles.
          </p>
        </div>
      </section>
      <section className="detailed-services section light-section">
        <div className="container">
          {services.map((s, i) => (
            <article
              className={`service-detail-row ${i % 2 ? "reverse" : ""}`}
              key={s.slug}
            >
              <SystemVisual kind={s.kind} />
              <div className="detail-copy">
                <span className="section-number">
                  {s.number} — {s.short.toUpperCase()}
                </span>
                <h2>{s.title}</h2>
                <p className="lead">{s.description}</p>
                <div className="detail-columns">
                  <div>
                    <h3>Aborda</h3>
                    <p>{s.sections[0].items.slice(0, 2).join(" · ")}</p>
                  </div>
                  <div>
                    <h3>Puede incluir</h3>
                    <p>{s.sections[1].items.slice(0, 2).join(" · ")}</p>
                  </div>
                </div>
                <div className="example-note">
                  <b>Ejemplo ilustrativo</b>
                  <span>
                    {i === 0
                      ? "Plataforma interna para coordinar inventario, permisos y actividad."
                      : i === 1
                        ? "Portal adaptable con área privada e integración de servicios."
                        : i === 2
                          ? "Flujo que valida información y conecta dos sistemas mediante API."
                          : "Panel operativo que reúne indicadores desde varias fuentes."}
                  </span>
                </div>
                <TextLink to={`/servicios/${s.slug}`}>
                  Explorar este servicio
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  )
}
