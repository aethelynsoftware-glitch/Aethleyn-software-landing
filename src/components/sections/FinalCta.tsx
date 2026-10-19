import Button from "../ui/Button"

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="cta-grid" />
      <div className="container">
        <span className="section-number">COMENCEMOS</span>
        <h2>
          Tu próximo proyecto merece
          <br />
          una buena <em>arquitectura.</em>
        </h2>
        <p>
          Cuéntanos qué necesitas resolver y exploremos cómo construir una
          solución tecnológica adaptada a tu negocio.
        </p>
        <Button to="/contacto">Conversemos sobre tu proyecto</Button>
      </div>
    </section>
  )
}
