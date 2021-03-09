const requiredEnv = (envName: string): never => {
  throw new Error(`${envName} is a required env`)
}

export const DEFAULT_LOCALE: SupportedLocales = 'pt-BR'
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || requiredEnv('NEXT_PUBLIC_API_URL')
