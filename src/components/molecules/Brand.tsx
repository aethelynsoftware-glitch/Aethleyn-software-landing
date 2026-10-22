import { Link } from "react-router"

export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="brand" aria-label="Aethelyn Software, inicio">
      <span className="brand-mark">
        <img src="/brand/aethelyn-logo.svg" alt="" />
      </span>
      <span className={light ? "brand-type is-light" : "brand-type"}>
        <strong>Aethelyn</strong>
        <small>SOFTWARE</small>
      </span>
    </Link>
  )
}
