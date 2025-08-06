import type { Namespace, NamespaceKeys, TranslationFunction, AllTranslationKeys } from './translation'

declare module 'next-intl' {
  interface UseTranslationsResult<NS extends Namespace | undefined = undefined> {
    t: NS extends Namespace ? TranslationFunction<NamespaceKeys<NS>> : TranslationFunction<AllTranslationKeys>
  }
}
