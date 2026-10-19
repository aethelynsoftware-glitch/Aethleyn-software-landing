import Button, { TextLink } from "../components/ui/Button"
import { HeroComposition, SystemVisual } from "../components/visuals/Visuals"
import { services } from "../data/site"
import { FinalCta } from "../components/sections/FinalCta"

export default function Services() {
  return (
    <>
      <section className="inner-hero services-hero">
        <div className="container inner-hero-grid">
          <div>
            <span className="breadcrumb">AETHELYN / SERVICIOS</span>
            <h1>
              Soluciones digitales para <em>necesidades reales.</em>
            </h1>
            <p>
              Desarrollamos herramientas tecnológicas adaptadas a los procesos,
              objetivos y desafíos de cada organización.
            </p>
            <Button to="/contacto">Consultar un proyecto</Button>
          </div>
          <HeroComposition />
        </div>
      </section>
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
