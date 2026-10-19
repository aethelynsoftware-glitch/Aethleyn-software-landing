export type ContactFormValues = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  preference: string
  description: string
  privacyConsent: boolean
  website: string
}

export type ContactSuccessResponse = {
  success: true
  message: string
  requestId: string
}

export type ContactErrorResponse = {
  success: false
  message: string
  code: string
  fields?: Record<string, string>
}

export class ContactRequestError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(message)
    this.name = "ContactRequestError"
  }
}
