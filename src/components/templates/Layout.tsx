import { Outlet } from "react-router"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
