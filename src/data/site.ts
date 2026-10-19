export type Service = {
  slug: string
  number: string
  short: string
  title: string
  description: string
  hero: string
  lead: string
  kind: "system" | "web" | "flow" | "data"
  sections: { title: string; text: string; items: string[] }[]
}

export const services: Service[] = [
  {
    slug: "software-a-medida",
    number: "01",
    short: "Software a medida",
    title: "Sistemas que responden a tu operación",
    description:
      "Sistemas diseñados alrededor de tus procesos, reglas de negocio y necesidades operativas.",
    hero: "Software construido alrededor de tu negocio.",
    lead: "Diseñamos plataformas adaptadas a procesos, permisos, flujos de trabajo y decisiones específicas, sin obligar a tu organización a encajar en una herramienta genérica.",
    kind: "system",
    sections: [
      {
        title: "Cuándo conviene una solución a medida",
        text: "Cuando los procesos son propios, las herramientas actuales crean fricción o la información necesita una estructura específica.",
        items: [
          "Procesos difíciles de estandarizar",
          "Reglas de negocio particulares",
          "Crecimiento limitado por herramientas actuales",
        ],
      },
      {
        title: "Sistemas que podemos construir",
        text: "El alcance se define para cada proyecto. Estos son ejemplos ilustrativos, no productos comerciales preexistentes.",
        items: [
          "Inventario y control operativo",
          "Gestión administrativa",
          "Reservas y plataformas internas",
        ],
      },
      {
        title: "Funcionalidad antes que complejidad",
        text: "Mapeamos usuarios, tareas, permisos y excepciones para priorizar lo que genera utilidad real desde la primera versión.",
        items: [
          "Flujos y roles",
          "Prototipos navegables",
          "Backlog priorizado",
        ],
      },
      {
        title: "Arquitectura preparada para evolucionar",
        text: "Seleccionamos estructura, datos e integraciones según el contexto, evitando tanto la improvisación como la sobreingeniería.",
        items: [
          "Módulos desacoplados",
          "Datos consistentes",
          "Integraciones documentadas",
        ],
      },
      {
        title: "Validación continua",
        text: "Revisamos la solución por etapas con escenarios concretos antes de la puesta en marcha.",
        items: [
          "Revisiones funcionales",
          "Pruebas de recorridos clave",
          "Criterios de aceptación",
        ],
      },
    ],
  },
  {
    slug: "aplicaciones-web",
    number: "02",
    short: "Aplicaciones web",
    title: "Experiencias web claras y funcionales",
    description:
      "Plataformas modernas, accesibles y diseñadas para ofrecer experiencias claras en cualquier dispositivo.",
    hero: "Experiencias digitales diseñadas para funcionar.",
    lead: "Construimos aplicaciones web que combinan una interfaz comprensible con una base técnica mantenible, desde portales especializados hasta herramientas operativas.",
    kind: "web",
    sections: [
      {
        title: "Plataformas web y portales",
        text: "Creamos productos orientados a clientes, equipos internos o redes de colaboradores con recorridos definidos.",
        items: [
          "Portales de clientes",
          "Herramientas internas",
          "Plataformas de autoservicio",
        ],
      },
      {
        title: "Interfaces adaptables",
        text: "Cada vista responde al contexto de uso, preservando jerarquía y legibilidad en escritorio, tablet y móvil.",
        items: [
          "Diseño responsive",
          "Accesibilidad",
          "Estados de interfaz claros",
        ],
      },
      {
        title: "Experiencia de usuario",
        text: "La arquitectura de información y la interacción se diseñan antes de añadir detalle visual.",
        items: [
          "Mapas de navegación",
          "Prototipos",
          "Sistemas visuales coherentes",
        ],
      },
      {
        title: "Integración con APIs",
        text: "Conectamos la experiencia visible con servicios, datos y herramientas existentes de forma controlada.",
        items: [
          "APIs internas y externas",
          "Autenticación",
          "Sincronización de datos",
        ],
      },
      {
        title: "Mantenibilidad y evolución",
        text: "Organizamos componentes y lógica para que nuevas capacidades puedan incorporarse sin rehacer el producto.",
        items: [
          "Código modular",
          "Documentación esencial",
          "Despliegue progresivo",
        ],
      },
    ],
  },
  {
    slug: "automatizacion",
    number: "03",
    short: "Automatización e integración",
    title: "Procesos conectados con mayor precisión",
    description:
      "Conectamos herramientas y optimizamos tareas para reducir operaciones manuales y mejorar la consistencia.",
    hero: "Menos tareas manuales. Procesos mejor conectados.",
    lead: "Analizamos actividades repetitivas y puntos de intercambio de información para diseñar automatizaciones viables, controlables y ajustadas al riesgo de cada proceso.",
    kind: "flow",
    sections: [
      {
        title: "Identificación de tareas repetitivas",
        text: "Documentamos el proceso actual y distinguimos qué pasos pueden automatizarse de forma responsable.",
        items: [
          "Entradas manuales",
          "Validaciones recurrentes",
          "Transferencia entre herramientas",
        ],
      },
      {
        title: "Integración entre sistemas",
        text: "Diseñamos conexiones mediante APIs, eventos o procesos programados según las capacidades disponibles.",
        items: [
          "APIs y webhooks",
          "Servicios de terceros",
          "Sistemas internos",
        ],
      },
      {
        title: "Flujos de trabajo",
        text: "Definimos disparadores, reglas, aprobaciones y resultados para evitar automatizaciones opacas.",
        items: ["Eventos", "Reglas y decisiones", "Notificaciones"],
      },
      {
        title: "Validación y control de errores",
        text: "Incorporamos controles para identificar datos incompletos, fallos y casos que requieren revisión humana.",
        items: [
          "Validación de entradas",
          "Reintentos controlados",
          "Registro de incidencias",
        ],
      },
      {
        title: "Monitorización de procesos",
        text: "Preparamos visibilidad operativa para conocer el estado del flujo y facilitar su mantenimiento.",
        items: [
          "Estados y trazabilidad",
          "Alertas relevantes",
          "Historial de ejecución",
        ],
      },
    ],
  },
  {
    slug: "datos-y-dashboards",
    number: "04",
    short: "Datos y dashboards",
    title: "Información que ayuda a decidir",
    description:
      "Centralizamos información y la transformamos en visualizaciones para comprender mejor la operación.",
    hero: "Convierte tus datos en una visión más clara del negocio.",
    lead: "Diseñamos dashboards que priorizan las preguntas del negocio, conectan fuentes relevantes y presentan indicadores con una jerarquía útil.",
    kind: "data",
    sections: [
      {
        title: "Centralización de información",
        text: "Reunimos datos relevantes en una estructura común, considerando actualización, origen y permisos.",
        items: ["Fuentes distribuidas", "Modelado de datos", "Accesos por rol"],
      },
      {
        title: "Indicadores operativos",
        text: "Definimos métricas comprensibles y trazables, vinculadas a preguntas concretas de la operación.",
        items: [
          "Definición de indicadores",
          "Contexto y comparativas",
          "Criterios consistentes",
        ],
      },
      {
        title: "Dashboards personalizados",
        text: "Organizamos filtros, tablas y visualizaciones según el nivel de detalle que necesita cada usuario.",
        items: [
          "Vistas ejecutivas",
          "Análisis operativo",
          "Detalle exploratorio",
        ],
      },
      {
        title: "Integración de fuentes",
        text: "Evaluamos APIs, bases de datos y archivos para establecer un flujo de información sostenible.",
        items: ["Bases de datos", "APIs", "Archivos estructurados"],
      },
      {
        title: "Calidad y consistencia",
        text: "Los datos necesitan contexto. Hacemos visibles su origen, actualización y posibles limitaciones.",
        items: [
          "Reglas de calidad",
          "Trazabilidad",
          "Actualización controlada",
        ],
      },
    ],
  },
]

export const mainNav = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Cómo trabajamos", to: "/metodologia" },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
]
