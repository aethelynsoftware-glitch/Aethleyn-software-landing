import Button from "../components/ui/Button"
import { ArchitectureVisual } from "../components/visuals/Visuals"
import { Icon } from "../components/ui/Icons"

const phases = [
  {
    n: "01",
    title: "Descubrimiento",
    desc: "Comprendemos el problema antes de proponer una solución.",
    items: [
      "Comprensión de necesidades",
      "Identificación del problema",
      "Revisión de procesos",
      "Definición de objetivos",
    ],
  },
  {
    n: "02",
    title: "Diseño y planificación",
    desc: "Convertimos el contexto en decisiones concretas y un recorrido de trabajo.",
    items: [
      "Definición del alcance",
      "Diseño de experiencia de usuario",
      "Arquitectura de la solución",
      "Priorización de funcionalidades",
    ],
  },
  {
    n: "03",
    title: "Desarrollo y validación",
    desc: "Construimos por etapas visibles y revisamos el comportamiento esperado.",
    items: [
      "Implementación por etapas",
      "Validación de funcionalidades",
      "Pruebas",
      "Revisión de calidad",
    ],
  },
  {
    n: "04",
    title: "Implementación y evolución",
    desc: "Preparamos la puesta en marcha y el siguiente ciclo de aprendizaje.",
    items: [
      "Preparación del despliegue",
      "Documentación necesaria",
      "Puesta en marcha",
      "Soporte y mejoras acordadas",
    ],
  },
]

export default function Methodology() {
  return (
    <>
      <section className="inner-hero methodology-hero">
        <div className="container inner-hero-grid">
          <div>
            <span className="breadcrumb">AETHELYN / METODOLOGÍA</span>
            <h1>
              Cada proyecto comienza con <em>claridad.</em>
            </h1>
            <p>
              Una buena solución tecnológica no empieza escribiendo código.
              Empieza entendiendo qué necesita el negocio y definiendo cómo
              resolverlo.
            </p>
            <Button to="/contacto">Hablemos de tu proyecto</Button>
          </div>
          <div
            className="method-orbit"
            role="img"
            aria-label="Ciclo de planificación, diseño, desarrollo e implementación"
          >
            <div>Descubrir</div>
            <div>Diseñar</div>
            <div>Construir</div>
            <div>Evolucionar</div>
            <span>A</span>
          </div>
        </div>
      </section>
      <section className="method-intro section light-section">
        <div className="container">
          <span className="section-number">EL PROCESO</span>
          <h2>Cuatro fases. Una visión compartida.</h2>
          <p>
            La metodología organiza la conversación y reduce ambigüedades. Cada
            fase produce decisiones y entregables adecuados al tamaño del
            proyecto.
          </p>
        </div>
      </section>
      <section className="phase-section light-section">
        <div className="container">
          {phases.map((p, i) => (
            <article className="phase" key={p.n}>
              <div className="phase-index">
                <span>FASE</span>
                <strong>{p.n}</strong>
                <i />
              </div>
              <div className="phase-copy">
                <h2>{p.title}</h2>
                <p>{p.desc}</p>
              </div>
              <ul>
                {p.items.map((x) => (
                  <li key={x}>
                    <Icon name="check" />
                    {x}
                  </li>
                ))}
              </ul>
              <span className="phase-watermark">{p.n}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="method-map dark-section section">
        <div className="container">
          <div className="section-head light">
            <div>
              <span className="section-number">VISIÓN DE CONJUNTO</span>
              <h2>
                Planificación, diseño y<br />
                tecnología conectados.
              </h2>
            </div>
            <p>
              Las decisiones de una fase informan a la siguiente. La validación
              mantiene alineadas la necesidad y la solución.
            </p>
          </div>
          <ArchitectureVisual />
        </div>
      </section>
      <section className="scope-section section">
        <div className="container scope-grid">
          <div>
            <span className="section-number">ALCANCE RESPONSABLE</span>
            <h2>Un acuerdo claro para cada proyecto.</h2>
          </div>
          <div>
            <p>
              Las características de cada solución determinan su alcance,
              cronograma y presupuesto. Antes de comenzar, definimos qué se
              construirá, cómo se validará y qué condiciones necesita la
              entrega.
            </p>
            <Button to="/contacto" variant="light">
              Iniciar una conversación
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
