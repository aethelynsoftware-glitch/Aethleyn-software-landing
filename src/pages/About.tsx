import InnerHero from "../components/organisms/InnerHero"
import SectionHeading from "../components/molecules/SectionHeading"
import Button from "../components/atoms/Button"
import ArchitectureVisual from "../components/organisms/ArchitectureVisual"
import Icon from "../components/atoms/Icon"

export default function About() {
  return (
    <>
      <InnerHero
        className="about-hero"
        intro={<span className="breadcrumb">AETHELYN / NOSOTROS</span>}
        title={
          <>
            Tecnología con propósito. <em>Ingeniería con criterio.</em>
          </>
        }
        description={
          <>
            En Aethelyn Software buscamos construir soluciones digitales que
            respondan a problemas reales, con una combinación de comprensión del
            negocio, diseño técnico y desarrollo responsable.
          </>
        }
        action={<Button to="/contacto">Conoce cómo podemos ayudarte</Button>}
        visual={
          <div
            className="about-art"
            role="img"
            aria-label="Composición conceptual de arquitectura de software"
          >
            <span>A</span>
            <i />
            <i />
            <i />
            <div>
              Claridad
              <br />
              Estructura
              <br />
              Evolución
            </div>
          </div>
        }
      />
      <section className="vision section light-section">
        <div className="container vision-grid">
          <div>
            <span className="section-number">NUESTRA VISIÓN</span>
            <h2>Construir tecnología útil, mantenible y adaptada.</h2>
          </div>
          <div>
            <p className="lead">
              La tecnología aporta valor cuando responde con precisión al
              contexto para el que fue creada.
            </p>
            <p>
              Nuestra visión es desarrollar soluciones que sean comprensibles
              para quienes las usan, sólidas para quienes las mantienen y
              capaces de evolucionar con la organización.
            </p>
          </div>
        </div>
      </section>
      <section className="work-way section">
        <div className="container">
          <SectionHeading
            label={<>NUESTRA FORMA DE TRABAJAR</>}
            title={
              <>
                Comprender antes
                <br />
                de construir.
              </>
            }
          >
            <p>
              Definimos objetivos claros, tomamos decisiones técnicas
              fundamentadas y mantenemos una comunicación transparente durante
              el proyecto.
            </p>
          </SectionHeading>
          <div className="principle-cards">
            {[
              [
                "01",
                "Calidad",
                "Cuidamos la estructura, el comportamiento y los detalles que sostienen una solución.",
              ],
              [
                "02",
                "Claridad",
                "Hacemos visibles el alcance, las decisiones y el estado real del trabajo.",
              ],
              [
                "03",
                "Responsabilidad",
                "Proponemos lo que el contexto necesita, sin promesas que no puedan sostenerse.",
              ],
              [
                "04",
                "Evolución continua",
                "Diseñamos una base que pueda aprender, ajustarse y crecer con propósito.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <Icon name="layers" />
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="technical-capacity dark-section section">
        <div className="container">
          <SectionHeading
            light
            label={<>CAPACIDAD TÉCNICA</>}
            title={
              <>
                Distintas disciplinas.
                <br />
                Una solución coherente.
              </>
            }
          >
            <p>
              Conectamos experiencia, aplicaciones, servicios y datos para
              construir herramientas empresariales completas.
            </p>
          </SectionHeading>
          <ArchitectureVisual />
          <div className="tech-list">
            {[
              "Frontend",
              "Backend",
              "Bases de datos",
              "Integraciones",
              "Aplicaciones empresariales",
            ].map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="about-cta section">
        <div className="container">
          <span>UNA CONVERSACIÓN PUEDE SER EL PRIMER PASO</span>
          <h2>Exploremos el problema antes de hablar de la solución.</h2>
          <Button to="/contacto" variant="light">
            Hablemos de tu proyecto
          </Button>
        </div>
      </section>
    </>
  )
}
