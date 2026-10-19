import { Icon } from "../ui/Icons"

export function SystemVisual({
  kind = "system",
  label,
}: {
  kind?: string
  label?: string
}) {
  if (kind === "flow") {
    return (
      <div
        className="visual visual-flow"
        role="img"
        aria-label={label || "Diagrama ilustrativo de procesos conectados"}
      >
        <span className="demo-tag">FLUJO ILUSTRATIVO</span>
        <div className="flow-line" />
        {["Entrada", "Validación", "API", "Resultado"].map((item, i) => (
          <div className={`flow-node node-${i + 1}`} key={item}>
            <span>0{i + 1}</span>
            {item}
          </div>
        ))}
        <div className="flow-log">
          <i />
          <i />
          <i />
          <small>Eventos procesados</small>
        </div>
      </div>
    )
  }
  if (kind === "data") {
    return (
      <div
        className="visual visual-dashboard"
        role="img"
        aria-label={
          label || "Dashboard demostrativo con indicadores y gráficos"
        }
      >
        <span className="demo-tag">DATOS DEMOSTRATIVOS</span>
        <div className="dash-head">
          <span>Visión operativa</span>
          <i />
        </div>
        <div className="metric-row">
          {["Actividad", "Procesos", "Alertas"].map((x, i) => (
            <div key={x}>
              <small>{x}</small>
              <strong>{[284, 64, 7][i]}</strong>
            </div>
          ))}
        </div>
        <div className="chart-area">
          {[35, 52, 45, 70, 61, 86, 76, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="dash-table">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
  if (kind === "web") {
    return (
      <div
        className="visual visual-web"
        role="img"
        aria-label={label || "Aplicación web adaptable en escritorio y móvil"}
      >
        <span className="demo-tag">PROTOTIPO ILUSTRATIVO</span>
        <div className="browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
          </div>
          <div className="browser-body">
            <aside />
            <main>
              <b />
              <span />
              <span />
              <div className="mini-grid">
                <i />
                <i />
                <i />
              </div>
            </main>
          </div>
        </div>
        <div className="phone">
          <div />
          <b />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }
  return (
    <div
      className="visual visual-system"
      role="img"
      aria-label={label || "Interfaz ilustrativa de gestión empresarial"}
    >
      <span className="demo-tag">SISTEMA ILUSTRATIVO</span>
      <div className="system-top">
        <span>Centro de operaciones</span>
        <i />
      </div>
      <div className="system-layout">
        <aside>
          {[1, 2, 3, 4, 5].map((x) => (
            <i key={x} />
          ))}
        </aside>
        <main>
          <div className="system-title">
            <b />
            <span />
          </div>
          <div className="system-stats">
            <i />
            <i />
            <i />
          </div>
          <div className="system-table">
            {[1, 2, 3, 4].map((x) => (
              <span key={x} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export function ArchitectureVisual() {
  const nodes = [
    ["Experiencia", "Interfaz clara", "grid"],
    ["Frontend", "Aplicación", "code"],
    ["API", "Conexiones", "globe"],
    ["Backend", "Lógica", "layers"],
    ["Datos", "Estructura", "chart"],
  ]
  return (
    <div
      className="architecture-visual"
      role="img"
      aria-label="Capas de arquitectura: experiencia, frontend, API, backend y datos"
    >
      <div className="architecture-grid" />
      <div className="architecture-line" />
      {nodes.map(([title, sub, icon], i) => (
        <div className={`architecture-node arch-${i}`} key={title}>
          <Icon name={icon} />
          <span>
            <small>{sub}</small>
            <strong>{title}</strong>
          </span>
        </div>
      ))}
      <div className="arch-signal signal-a" />
      <div className="arch-signal signal-b" />
    </div>
  )
}

export function HeroComposition() {
  return (
    <div
      className="hero-composition"
      aria-label="Composición ilustrativa de un ecosistema de software empresarial"
      role="img"
    >
      <div className="orbit orbit-a" />
      <div className="orbit orbit-b" />
      <div className="hero-window main-window">
        <div className="window-head">
          <span>Operaciones / Vista general</span>
          <i />
          <i />
        </div>
        <div className="window-body">
          <aside>
            <b />
            <span />
            <span />
            <span />
            <span />
          </aside>
          <main>
            <div className="hero-metrics">
              <i />
              <i />
              <i />
            </div>
            <div className="hero-chart">
              <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                <path d="M0 84 C35 76 50 22 88 49 S143 78 168 42 S225 9 300 28" />
              </svg>
            </div>
            <div className="hero-rows">
              <span />
              <span />
              <span />
            </div>
          </main>
        </div>
      </div>
      <div className="hero-window code-window">
        <span>architecture.ts</span>
        <code>
          <i>const</i> solution = &#123;
          <br />
          &nbsp; experience,
          <br />
          &nbsp; businessLogic,
          <br />
          &nbsp; reliableData
          <br />
          &#125;;
        </code>
      </div>
      <div className="hero-window stack-window">
        <small>CAPAS DEL SISTEMA</small>
        {["Frontend", "API", "Backend", "Datos"].map((x, i) => (
          <div key={x}>
            <i>{i + 1}</i>
            <span>{x}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
