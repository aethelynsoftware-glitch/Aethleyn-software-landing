import SectionHeading from "../components/molecules/SectionHeading"
import Button from "../components/atoms/Button"
import TextLink from "../components/atoms/TextLink"
import ArchitectureVisual from "../components/organisms/ArchitectureVisual"
import HeroComposition from "../components/organisms/HeroComposition"
import SystemVisual from "../components/organisms/SystemVisual"
import Icon from "../components/atoms/Icon"
import { services } from "../data/site"
import FinalCta from "../components/organisms/FinalCta"

const stages = [
  [
    "01",
    "Descubrimiento y diagnóstico",
    "Comprendemos el contexto, el proceso y el problema que vale la pena resolver.",
  ],
  [
    "02",
    "Diseño y planificación",
    "Convertimos necesidades en alcance, experiencia y decisiones de arquitectura.",
  ],
  [
    "03",
    "Desarrollo y validación",
    "Construimos por etapas y revisamos cada recorrido con criterios claros.",
  ],
  [
    "04",
    "Implementación y evolución",
    "Preparamos la puesta en marcha y una base que pueda seguir creciendo.",
  ],
]

export default function Home() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="eyebrow">
              <i /> Ingeniería de software · Soluciones a medida
            </div>
            <h1>
              Transformamos desafíos empresariales en{" "}
              <span>soluciones digitales.</span>
            </h1>
            <p>
              Diseñamos y desarrollamos software a medida para empresas que
              buscan optimizar sus procesos, conectar sus operaciones y
              convertir sus necesidades en herramientas digitales reales.
            </p>
            <div className="hero-actions">
              <Button to="/contacto">Hablemos de tu proyecto</Button>
              <Button to="/servicios" variant="secondary">
                Explorar soluciones
              </Button>
            </div>
            <div className="hero-pillars">
              {[
                ["code", "Desarrollo a medida"],
                ["layers", "Arquitectura bien diseñada"],
                ["chart", "Tecnología orientada al negocio"],
              ].map(([icon, text]) => (
                <div key={text}>
                  <Icon name={icon} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroComposition />
        </div>
        <div className="hero-index">
          <span>01</span>
          <i />
          <small>Aethelyn Software</small>
        </div>
      </section>

      <section className="intro-section section light-section">
        <div className="container intro-grid">
          <div>
            <span className="section-number">01 — ENFOQUE</span>
            <h2>
              El software debe adaptarse a tu negocio. <em>No al revés.</em>
            </h2>
          </div>
          <div className="intro-copy">
            <p className="lead">
              Cada empresa tiene procesos, decisiones y necesidades
              particulares. Una solución tecnológica bien diseñada comienza por
              comprenderlos.
            </p>
            <p>
              Observamos cómo se mueve la información, dónde aparecen las
              fricciones y qué necesita cada usuario antes de definir una
              interfaz o elegir una tecnología.
            </p>
            <TextLink to="/nosotros">Conoce nuestro enfoque</TextLink>
          </div>
          <div
            className="process-map"
            role="img"
            aria-label="Relación entre proceso, información y tecnología"
          >
            <div className="process-photo">
              <SystemVisual kind="system" />
            </div>
            <div className="process-legend">
              <span>Proceso</span>
              <i />
              <span>Información</span>
              <i />
              <span>Tecnología</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-home section">
        <div className="container">
          <SectionHeading
            label={<>02 — CAPACIDADES</>}
            title={
              <>
                Soluciones tecnológicas
                <br />
                diseñadas para avanzar.
              </>
            }
          >
            <p>
              El punto de partida no es un producto cerrado. Es el problema que
              tu organización necesita resolver.
            </p>
          </SectionHeading>
          <div className="service-editorial">
            {services.map((service, i) => (
              <article
                className={`service-feature feature-${i + 1}`}
                key={service.slug}
              >
                <div className="service-info">
                  <span>{service.number}</span>
                  <h3>{service.short}</h3>
                  <p>{service.description}</p>
                  <TextLink to={`/servicios/${service.slug}`}>
                    Explorar {service.short.toLowerCase()}
                  </TextLink>
                </div>
                <SystemVisual kind={service.kind} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="architecture-section section dark-section">
        <div className="container">
          <SectionHeading
            light
            label={<>03 — INGENIERÍA</>}
            title={
              <>
                Desde la arquitectura
                <br />
                hasta la experiencia final.
              </>
            }
          >
            <p>
              Cada proyecto requiere decisiones técnicas diferentes. Diseñamos
              cada capa para responder a las necesidades reales de uso,
              integración y evolución.
            </p>
          </SectionHeading>
          <ArchitectureVisual />
          <div className="architecture-caption">
            <span>Una solución conectada, no una suma de piezas.</span>
            <p>
              Experiencia, lógica, datos e infraestructura se diseñan como un
              sistema coherente.
            </p>
          </div>
        </div>
      </section>

      <section className="problems-section section light-section">
        <div className="container problem-grid">
          <div className="sticky-copy">
            <span className="section-number">04 — CONTEXTO</span>
            <h2>
              Cuando los procesos se complican, la tecnología puede
              simplificarlos.
            </h2>
            <p>
              No se trata de digitalizar por digitalizar. Se trata de reducir
              fricción y dar claridad a la operación.
            </p>
          </div>
          <div className="problem-list">
            {[
              [
                "Información dispersa",
                "Centralizar datos relevantes en una fuente coherente.",
              ],
              [
                "Tareas repetitivas",
                "Diseñar flujos que reduzcan pasos manuales evitables.",
              ],
              [
                "Sistemas rígidos",
                "Crear herramientas alrededor de la operación real.",
              ],
              [
                "Visión fragmentada",
                "Presentar indicadores y contexto en un solo entorno.",
              ],
              [
                "Herramientas aisladas",
                "Conectar servicios mediante integraciones controladas.",
              ],
              [
                "Procesos manuales",
                "Estructurar, validar y hacer trazable cada recorrido.",
              ],
            ].map(([problem, solution], i) => (
              <div key={problem}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{problem}</h3>
                  <p>{solution}</p>
                </div>
                <Icon name="arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="method-preview section">
        <div className="container">
          <SectionHeading
            label={<>05 — PROCESO</>}
            title={
              <>
                Un proceso claro desde
                <br />
                la primera conversación.
              </>
            }
          >
            <Button to="/metodologia" variant="light">
              Conoce nuestra metodología
            </Button>
          </SectionHeading>
          <div className="timeline">
            {stages.map(([n, title, desc]) => (
              <div key={n}>
                <span>{n}</span>
                <i />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-preview section light-section">
        <div className="container">
          <SectionHeading
            label={<>06 — EXPLORACIÓN</>}
            title={
              <>
                El trabajo habla a través
                <br />
                de las soluciones.
              </>
            }
          >
            <p>
              Conceptos propios que muestran cómo abordamos diferentes desafíos
              técnicos. Identificados siempre como demostrativos.
            </p>
          </SectionHeading>
          <div className="project-grid">
            <article className="project-large">
              <SystemVisual kind="data" />
              <div>
                <span>PROYECTO DEMOSTRATIVO · ANALÍTICA</span>
                <h3>Pulse — Centro de control operativo</h3>
                <p>
                  Concepto de dashboard para centralizar indicadores, alertas y
                  actividad de distintas áreas.
                </p>
                <div className="tags">
                  <b>React</b>
                  <b>API</b>
                  <b>Visualización</b>
                </div>
                <TextLink to="/proyectos">Ver caso ilustrativo</TextLink>
              </div>
            </article>
            <article className="project-small">
              <SystemVisual kind="flow" />
              <div>
                <span>PROTOTIPO PROPIO · INTEGRACIONES</span>
                <h3>Nexus — Orquestación de procesos</h3>
                <TextLink to="/proyectos">Explorar enfoque</TextLink>
              </div>
            </article>
          </div>
          <div className="center-action">
            <Button to="/proyectos" variant="light">
              Explorar proyectos
            </Button>
          </div>
        </div>
      </section>

      <section className="principles section">
        <div className="container principles-grid">
          <div>
            <span className="section-number">07 — CONFIANZA</span>
            <h2>Profesionalismo en cada decisión técnica.</h2>
            <p>
              La calidad de una colaboración también se construye con claridad,
              criterio y responsabilidad.
            </p>
          </div>
          <div className="principle-list">
            {[
              "Comprensión del negocio antes de desarrollar",
              "Alcance y entregables definidos",
              "Código organizado y mantenible",
              "Comunicación clara durante el proyecto",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <h3>{x}</h3>
                <Icon name="check" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
