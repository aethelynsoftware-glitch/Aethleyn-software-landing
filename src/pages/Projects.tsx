import { useState } from "react"
import Button, { TextLink } from "../components/ui/Button"
import { SystemVisual } from "../components/visuals/Visuals"

const projects = [
  {
    name: "Pulse",
    category: "Datos",
    kind: "data",
    type: "Centro de control operativo",
    problem:
      "Información operacional distribuida entre varias fuentes y sin una lectura compartida.",
    approach:
      "Concepto de panel modular con indicadores, alertas, filtros y detalle por área.",
    stack: ["React", "API", "Visualización"],
  },
  {
    name: "Nexus",
    category: "Automatización",
    kind: "flow",
    type: "Orquestación de procesos",
    problem:
      "Tareas secuenciales que dependen de transferencias manuales entre herramientas.",
    approach:
      "Flujo demostrativo con validaciones, estados, integración y trazabilidad de errores.",
    stack: ["Eventos", "Webhooks", "Node"],
  },
  {
    name: "Atlas",
    category: "Software",
    kind: "system",
    type: "Plataforma de gestión interna",
    problem:
      "Dificultad para coordinar inventario, solicitudes y permisos desde un solo entorno.",
    approach:
      "Prototipo modular orientado a roles, actividad y operaciones frecuentes.",
    stack: ["React", "TypeScript", "SQL"],
  },
  {
    name: "Prism",
    category: "Web",
    kind: "web",
    type: "Portal digital adaptable",
    problem:
      "Experiencia fragmentada entre escritorio y móvil para usuarios externos.",
    approach:
      "Sistema de interfaz responsive con navegación, área privada y estados accesibles.",
    stack: ["React", "Design system", "API"],
  },
]

export default function Projects() {
  const [active, setActive] = useState("Todos")
  const visible =
    active === "Todos"
      ? projects
      : projects.filter((x) => x.category === active)
  return (
    <>
      <section className="inner-hero projects-hero">
        <div className="container">
          <span className="breadcrumb">AETHELYN / PROYECTOS</span>
          <div className="project-hero-copy">
            <h1>
              Capacidad técnica que se puede <em>explorar.</em>
            </h1>
            <p>
              Cada proyecto es una oportunidad para resolver un problema, tomar
              buenas decisiones técnicas y construir una solución útil.
            </p>
          </div>
          <div className="projects-disclaimer">
            Los casos mostrados son conceptos propios y prototipos
            demostrativos. No representan clientes ni resultados comerciales.
          </div>
        </div>
      </section>
      <section className="portfolio section light-section">
        <div className="container">
          <div className="filter-bar">
            <span>Filtrar capacidades</span>
            <div>
              {["Todos", "Software", "Web", "Automatización", "Datos"].map(
                (x) => (
                  <button
                    onClick={() => setActive(x)}
                    className={active === x ? "active" : ""}
                    key={x}
                  >
                    {x}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="portfolio-grid">
            {visible.map((p, i) => (
              <article className={i % 3 === 0 ? "wide" : ""} key={p.name}>
                <SystemVisual kind={p.kind} />
                <div className="project-body">
                  <span>
                    PROYECTO DEMOSTRATIVO · {p.category.toUpperCase()}
                  </span>
                  <div className="project-title">
                    <h2>{p.name}</h2>
                    <small>{p.type}</small>
                  </div>
                  <div className="case-columns">
                    <div>
                      <b>Problema</b>
                      <p>{p.problem}</p>
                    </div>
                    <div>
                      <b>Enfoque</b>
                      <p>{p.approach}</p>
                    </div>
                  </div>
                  <div className="tags">
                    {p.stack.map((x) => (
                      <b key={x}>{x}</b>
                    ))}
                  </div>
                  <TextLink to="/contacto">
                    Consultar una solución similar
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="portfolio-ready">
        <div className="container">
          <div>
            <span>ESTRUCTURA PREPARADA PARA CRECER</span>
            <h2>Nuevos proyectos, el mismo nivel de claridad.</h2>
            <p>
              La galería está organizada para incorporar futuros casos con
              contexto, decisiones técnicas y alcance verificable.
            </p>
          </div>
          <Button to="/contacto">Conversemos</Button>
        </div>
      </section>
    </>
  )
}
