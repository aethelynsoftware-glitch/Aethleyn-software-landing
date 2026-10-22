import { createBrowserRouter } from "react-router"
import Layout from "../components/templates/Layout"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: () =>
          import("../pages/Home").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "servicios",
        lazy: () =>
          import("../pages/Services").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "servicios/:serviceSlug",
        lazy: () =>
          import("../pages/ServiceDetail").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "metodologia",
        lazy: () =>
          import("../pages/Methodology").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "proyectos",
        lazy: () =>
          import("../pages/Projects").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "nosotros",
        lazy: () =>
          import("../pages/About").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "contacto",
        lazy: () =>
          import("../pages/Contact").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "*",
        lazy: () =>
          import("../pages/NotFound").then((module) => ({
            Component: module.default,
          })),
      },
    ],
  },
])
