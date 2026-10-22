export default function HeroComposition() {
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
