// Define recursive type for generating dot-notation translation keys
export type DotPrefix<T extends string, U> = U extends string ? `${T}.${U}` : never

export type TranslationKeys<T> = {
  [K in keyof T & string]: T[K] extends object ? DotPrefix<K, TranslationKeys<T[K]>> | K : K
}[keyof T & string]

// Import translation files with 'as const' to preserve literal types
import enCommon from '@/../public/messages/en/common.json' assert { type: 'json' }
import viCommon from '@/../public/messages/vi/common.json' assert { type: 'json' }

// Generate key types for each namespace
export type CommonTranslationKey = TranslationKeys<typeof enCommon>
export type ViCommonTranslationKey = TranslationKeys<typeof viCommon>

// Define available namespaces
export type Namespace = 'common' // Add more namespaces as needed

// Define resources structure
export const resources = {
  en: { common: enCommon },
  vi: { common: viCommon },
} as const

// Define namespace keys for type-safe access
export type NamespaceKeys<T extends Namespace> = T extends 'common' ? CommonTranslationKey : never

// Explicitly define namespaced keys for better autocompletion
export type NamespacedTranslationKeys = DotPrefix<'common', CommonTranslationKey>

// Use only namespaced keys for non-namespaced calls
export type AllTranslationKeys = NamespacedTranslationKeys

// Define type for translation parameters
export type TranslationParams = Record<string, string | number | undefined>

// Define the translation function type
export type TranslationFunction<Keys extends string = AllTranslationKeys> = <T extends Keys>(
  key: T,
  params?: TranslationParams,
) => string

export type TranslationRichFunction<Keys extends string = AllTranslationKeys> = <T extends Keys>(
  key: T,
  values?: Record<string, (value: string) => React.JSX.Element>,
) => string
