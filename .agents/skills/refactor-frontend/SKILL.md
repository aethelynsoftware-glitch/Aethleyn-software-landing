---
name: refactor-frontend
description: Refactoriza un archivo del frontend de este proyecto para reutilizar o crear componentes genéricos organizados con atomic design. Úsalo al extraer controles de interfaz, adaptar componentes existentes o reubicar los componentes implicados en src/components.
---

# Refactorizar el frontend

## Archivo y alcance

- Lee las instrucciones aplicables de `AGENTS.md` y revisa el archivo que indique el usuario.
- Si no indica un archivo, pide su ruta y espera la respuesta antes de refactorizar. No elijas `main.tsx` por defecto. Si la ruta no existe o es ambigua, solicita aclaración sin modificar archivos.
- Limita los cambios al archivo solicitado, los componentes implicados, sus estilos y los consumidores que deban actualizarse por cambios de interfaz o ubicación. No reorganices componentes ajenos, rutas, lógica de contacto ni el backend de Supabase salvo que el usuario lo solicite.
- Conserva `src/main.tsx` como punto de entrada. No crees commits salvo que el usuario los solicite.

## Detectar y buscar sustitutos

1. Detecta primitivas de interfaz utilizadas directamente en el archivo, como `button`, `input`, `textarea` y `select`, y componentes locales que dupliquen esos controles: identifica su comportamiento, props, estilos, accesibilidad y contexto de uso. Si el archivo solicitado ya es un átomo, conserva las primitivas que implementan su responsabilidad.
2. Conserva HTML semántico y contenedores como `div`, `span`, `p` o `section` cuando extraerlos no aporte una abstracción útil. Un archivo sin controles extraíbles puede no necesitar cambios: explica el resultado.
3. Busca sustitutos en todo `src`, incluidos componentes declarados dentro de otros archivos. Revisa implementación y consumidores, no solo nombres.
4. Evalúa compatibilidad de comportamiento, props, eventos, estilos, estados deshabilitados, etiquetas y atributos accesibles. Reutiliza directamente los componentes que cubran lo requerido.
5. Si el sustituto existe fuera de `src/components`, reubícalo según su nivel y actualiza todos sus imports. Extrae declaraciones incrustadas solo cuando estén implicadas en la tarea.

## Adaptar o crear

### Existe un sustituto, pero requiere adaptación

Presenta una propuesta concreta con:

- Componente candidato y diferencias respecto al uso requerido.
- Props y comportamiento que se añadirían o cambiarían.
- Compatibilidad, consumidores afectados, archivos a modificar o mover y verificación prevista.

Comunica la propuesta antes de editar y, si el usuario pidió refactorizar, implementa la adaptación dentro del alcance autorizado e integra el componente en el archivo solicitado. Si pidió únicamente revisar o proponer, entrega la propuesta sin modificar archivos. Conserva compatibilidad con los consumidores existentes cuando sea posible y no crees un duplicado para evitar adaptar el componente compartido.

### No existe un sustituto

Crea un componente genérico en `src/components` e intégralo en el archivo solicitado. Define solo las props, callbacks, variantes o puntos de composición que los usos concretos necesitan. Evita nombres o APIs ligados a tareas para controles genéricos.

## Atomic design

Usa estas carpetas bajo `src/components`, creando solo las necesarias:

| Carpeta | Responsabilidad |
| --- | --- |
| `atoms/` | Controles y unidades básicas, como Button, Input o Textarea. Encapsulan HTML nativo. |
| `molecules/` | Composiciones pequeñas de átomos, como un campo con etiqueta y mensaje. |
| `organisms/` | Unidades funcionales que agrupan moléculas y átomos. |
| `templates/` | Disposición de la interfaz mediante composición, sin acceso directo a API o store. |
| `pages/` | Composición de pantalla y conexión con datos y comportamiento de aplicación. |

- Las pantallas en `src/pages` siguen siendo las entradas de las rutas de `src/app/routes.tsx`; no las muevas a `src/components/pages` solo para completar la jerarquía.
- Revisa primero los componentes existentes en `src/components/ui`, `layout`, `brand`, `sections` y `visuals`. Reubica únicamente los implicados cuando aporte valor a la tarea, conservando los imports y exports de sus consumidores.
- Elige el nivel por responsabilidad y composición; no crees todas las capas para cada extracción.
- Los átomos pueden contener primitivas nativas: no vuelvas a extraerlas recursivamente ni crees wrappers sin utilidad.
- Los átomos, moléculas y templates reciben datos y callbacks por props; no dependen directamente de la servicio de contacto, Supabase ni de un store. Mantén efectos de aplicación fuera de los controles genéricos.
- Los organismos pueden representar unidades de dominio; evita mezclar operaciones de red con presentación cuando la composición y los callbacks permitan separarlas.
- Preserva semántica, nombres accesibles, asociaciones de etiquetas, teclado, foco, tipos de botones y estados `disabled` y `required`. Mantén atributos nativos necesarios configurables.
- Sigue TypeScript, TSX, ES modules y nombres PascalCase. Tipa las props y callbacks sin introducir `any`; respeta el formato de los archivos existentes. Preserva las clases CSS, la apariencia y los mensajes en español.
- Reubica solo los componentes implicados, actualizando todos sus consumidores. Mueve estilos asociados únicamente si hace falta, sin romper selectores, imports ni recursos relativos.

## Verificación

- Consulta Context7 cuando necesites documentación de una librería, siguiendo `AGENTS.md`: primero resuelve su ID y después consulta el concepto específico. La mera extracción de componentes no requiere buscar documentación.
- Ejecuta `npm run build` tras los cambios y revisa el diff y los imports de archivos movidos.
- Verifica manualmente los comportamientos afectados si hay acceso a un navegador. Comprueba navegación y enlaces si se modifican; si se toca el formulario de contacto, verifica validación, envío y estados de carga, éxito y error. Comprueba accesibilidad de los controles modificados.
- Usa pruebas existentes relevantes. Añade pruebas solo cuando verifiquen comportamiento significativo o riesgos concretos; no incorpores un framework de pruebas para una extracción sencilla.
- Si una comprobación no puede ejecutarse, informa de esa limitación sin presentarla como superada.

## Entrega

Informa brevemente de:

- Componentes reutilizados y cambios de comportamiento o interfaz, si los hay.
- Archivos añadidos con sus rutas y nivel de atomic design.
- Movimientos con origen → destino y actualización de consumidores.
- Comprobaciones realizadas y resultado.
- Propuestas de adaptación y cuáles se implementaron o quedaron pendientes, con el motivo.

Si no se requieren cambios, explica por qué. No atribuyas al resultado verificaciones ni movimientos que no hayas realizado.
