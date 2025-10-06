import { LOCALE_KEY } from '@/configs/constant'
import { setCookie } from '@/utils/cookie'
import { LOCALES } from '@/translations/languages'
import { loadCatalog } from '@/translations/pagesRouterI18n'
import { i18n } from '@lingui/core'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const changeLanguage = async (lang: LOCALES) => {
    const messages = await loadCatalog(lang)
    setCookie(LOCALE_KEY, lang)
    i18n.loadAndActivate({ locale: lang, messages: messages })
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
