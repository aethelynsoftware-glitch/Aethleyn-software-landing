import Button from "../components/atoms/Button"

export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Esta ruta aún no forma parte del sistema.</h1>
      <p>Vuelve al inicio para seguir explorando Aethelyn Software.</p>
      <Button to="/">Volver al inicio</Button>
    </section>
  )
}
