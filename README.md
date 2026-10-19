# Aethelyn Software — Frontend y formulario de contacto

Web corporativa construida con React 19, TypeScript, Vite 8, React Router 7 y Tailwind CSS 4.

## Arquitectura

El navegador envía los datos a la Edge Function `submit-contact`. La función valida y normaliza la entrada, aplica CORS, comprueba un campo trampa antispam y llama a una función SQL que registra de forma atómica la solicitud y una notificación pendiente en una outbox. La notificación se intenta enviar mediante Resend. Si el proveedor falla, la solicitud permanece guardada y la outbox conserva el trabajo pendiente.

```text
React Contact.tsx
  -> src/features/contact/services/contact.service.ts
  -> Supabase Edge Function: submit-contact
  -> SQL RPC create_contact_request
  -> PostgreSQL contact_requests + contact_notification_outbox
  -> Resend (notificación interna)
```

La tabla de solicitudes y las tablas técnicas tienen RLS habilitado y no conceden lectura/escritura a `anon` ni `authenticated`. La escritura pública solo se acepta a través de la Edge Function. Las operaciones administrativas futuras deberán utilizar una sesión administrativa y permisos explícitos; no se deben añadir políticas de lectura pública.

## Estructura relevante

- `src/features/contact/`: servicio HTTP, validación y tipos del formulario.
- `src/config/env.ts`: lectura centralizada de variables públicas.
- `supabase/migrations/`: esquema versionado de PostgreSQL.
- `supabase/functions/submit-contact/`: endpoint público y validación.
- `supabase/functions/_shared/`: CORS y envío de correo.
- `supabase/functions/retry-contact-notifications/`: procesamiento de un correo pendiente por invocación, protegido con secreto.

## Requisitos

- Node.js compatible con Vite 8.
- pnpm (la herramienta de paquetes que ya utiliza el repositorio).
- Supabase CLI.
- Proyecto Supabase.
- Cuenta Resend y un dominio de remitente verificado para producción.

## Desarrollo del frontend

```bash
pnpm install
cp .env.example .env.local
# Completa VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY
pnpm run dev
pnpm run build
pnpm run format
```

Las variables `VITE_*` son públicas y se incorporan al bundle del navegador. No pongas claves secretas en ellas.

## Configuración de Supabase

1. Crea un proyecto Supabase desde el panel.
2. Instala la CLI y autentícate:

   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   ```

3. Revisa la migración antes de aplicarla y luego ejecuta:

   ```bash
   supabase db push
   ```

   La migración crea `contact_requests`, `contact_notification_outbox`, `contact_submission_events`, sus índices y las funciones SQL. No borra tablas existentes.

4. Completa `.env.local` con la URL y la clave publicable del proyecto.
5. Configura los secretos de las Edge Functions. Sustituye todos los placeholders:

   ```bash
   supabase secrets set CONTACT_ALLOWED_ORIGINS="http://localhost:5173,https://TU-DOMINIO-PRODUCCION"
   supabase secrets set RESEND_API_KEY="re_..."
   supabase secrets set CONTACT_NOTIFICATION_EMAIL="CORREO-EMPRESARIAL"
   supabase secrets set CONTACT_FROM_EMAIL="Aethelyn Software <contacto@TU-DOMINIO-VERIFICADO>"
   supabase secrets set NOTIFICATION_RETRY_SECRET="GENERA-UN-SECRETO-LARGO-Y-ALEATORIO"
   ```

   `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` están disponibles normalmente en el entorno de Edge Functions administradas por Supabase. Nunca expongas `SUPABASE_SERVICE_ROLE_KEY` al navegador.

6. Despliega las funciones:

   ```bash
   supabase functions deploy submit-contact --no-verify-jwt
   supabase functions deploy retry-contact-notifications --no-verify-jwt
   ```

   `submit-contact` desactiva la verificación JWT de plataforma porque es un endpoint de formulario público. La función aplica su propia validación, CORS, límites de entrada y control de abuso en la base de datos. La clave publicable del navegador no es un secreto ni un mecanismo suficiente contra bots.

7. Configura las variables de frontend en el proveedor de hosting y vuelve a construir/desplegar la web.

## CORS y abuso

`CONTACT_ALLOWED_ORIGINS` debe contener una lista separada por comas de orígenes exactos, incluyendo protocolo y puerto cuando corresponda. Para desarrollo Vite suele utilizar `http://localhost:5173`; comprueba el puerto real que utiliza tu entorno. No incluyas rutas como `/contacto`.

La base de datos limita a cinco solicitudes por hash de IP en diez minutos. Se almacena el hash SHA-256, no la IP completa. El control utiliza las cabeceras de IP proporcionadas por la infraestructura; revisa el comportamiento de tu proveedor de hosting antes de producción. El campo trampa complementa esta protección, pero no reemplaza un CAPTCHA. Turnstile no está integrado todavía.

## Notificaciones y reintentos

La solicitud y el elemento de outbox se crean en una sola transacción SQL. Un fallo de Resend no elimina la solicitud. El endpoint `retry-contact-notifications` reclama un elemento pendiente por invocación, limita intentos y usa el ID de outbox como clave de idempotencia de Resend.

Para automatizar reintentos, configura un scheduler externo para invocar periódicamente:

```bash
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/retry-contact-notifications" \
  -H "x-retry-secret: YOUR_NOTIFICATION_RETRY_SECRET"
```

No configures el scheduler hasta tener el secreto y el proyecto correctos. La función no debe exponerse a visitantes. Los elementos pendientes dejan de reclamarse tras ocho intentos; requieren revisión operativa.

El estado `sent` significa que Resend aceptó el mensaje y devolvió una respuesta exitosa; no garantiza que el mensaje haya llegado a la bandeja de entrada.

## Pruebas

Las pruebas de validación Deno están en `supabase/functions/submit-contact/validation_test.ts`:

```bash
deno test supabase/functions/submit-contact/validation_test.ts
```

Build del frontend:

```bash
pnpm run build
```

La prueba end-to-end con PostgreSQL, el proyecto remoto y Resend requiere configuración real. No se debe declarar el despliegue verificado hasta ejecutar dichas pruebas en el entorno correspondiente.

## Privacidad y retención

Los datos se recogen para responder a la consulta enviada por el visitante. Define y publica una política de privacidad adecuada al negocio antes de producción, incluyendo responsable, finalidad, retención y canal para ejercer derechos. Esta implementación no constituye por sí sola una certificación de cumplimiento legal. Establece un proceso de eliminación de solicitudes antiguas y eventos técnicos; no se ha programado una tarea automática de retención.

## Desarrollo futuro

Un panel comercial puede añadirse posteriormente con autenticación administrativa, roles, auditoría y políticas RLS específicas. No concedas acceso directo a `anon` y no reutilices la clave `service_role` en el navegador.
