const readPublicEnv = (key: string): string => {
  const value = import.meta.env[key as keyof ImportMetaEnv]
  return typeof value === "string" ? value.trim().replace(/\/$/, "") : ""
}

export const env = {
  supabaseUrl: readPublicEnv("VITE_SUPABASE_URL"),
  supabasePublishableKey: readPublicEnv("VITE_SUPABASE_PUBLISHABLE_KEY"),
}
