import Icon from "../atoms/Icon"

export default function ArchitectureVisual() {
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
