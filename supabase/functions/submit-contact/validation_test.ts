import { assertEquals } from "jsr:@std/assert@1"
import { normalizeAndValidate } from "./validation.ts"

const valid = {
  name: "Ana Pérez",
  email: "ana@example.com",
  company: "Empresa",
  service: "Software a medida",
  budget: "Por definir",
  preference: "",
  description: "Necesitamos organizar mejor los procesos internos.",
  privacyConsent: true,
  website: "",
}

Deno.test("accepts a valid contact request", () => {
  const result = normalizeAndValidate(valid)
  assertEquals(result.ok, true)
})

Deno.test("rejects invalid email", () => {
  const result = normalizeAndValidate({ ...valid, email: "no-es-correo" })
  assertEquals(result.ok, false)
  if (!result.ok) assertEquals(result.fields.email, "Introduce un correo válido.")
})

Deno.test("rejects unsupported service and budget", () => {
  const result = normalizeAndValidate({ ...valid, service: "Servicio inventado", budget: "€999" })
  assertEquals(result.ok, false)
  if (!result.ok) {
    assertEquals(result.fields.service, "Selecciona un servicio válido.")
    assertEquals(result.fields.budget, "Selecciona un presupuesto válido.")
  }
})

Deno.test("rejects missing consent and short description", () => {
  const result = normalizeAndValidate({ ...valid, privacyConsent: false, description: "Muy corto" })
  assertEquals(result.ok, false)
  if (!result.ok) {
    assertEquals(result.fields.privacyConsent !== undefined, true)
    assertEquals(result.fields.description !== undefined, true)
  }
})

Deno.test("rejects unexpected fields and oversized name", () => {
  const result = normalizeAndValidate({ ...valid, name: "a".repeat(121), extra: "not allowed" })
  assertEquals(result.ok, false)
})
