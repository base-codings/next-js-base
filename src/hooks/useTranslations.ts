import { useTranslations as useTranslationsNextIntl } from 'next-intl'
import type {
  Namespace,
  TranslationFunction,
  NamespaceKeys,
  AllTranslationKeys,
  TranslationRichFunction,
} from '@/types/translation'

// Overload signatures
function useTranslations<NS extends Namespace>(
  namespace: NS,
): { t: TranslationFunction<NamespaceKeys<NS>> & { rich: TranslationRichFunction<NamespaceKeys<NS>> } }
function useTranslations(): {
  t: TranslationFunction<AllTranslationKeys> & { rich: TranslationRichFunction<AllTranslationKeys> }
}

// Implementation
function useTranslations(namespace?: Namespace) {
  const t = useTranslationsNextIntl(namespace)
  type Keys = typeof namespace extends Namespace ? NamespaceKeys<typeof namespace> : AllTranslationKeys
  return {
    t: t as TranslationFunction<Keys> & { rich: TranslationRichFunction<Keys> },
  }
}

export default useTranslations
