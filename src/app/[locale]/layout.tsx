import '@/assets/fonts/fonts.css'
import type { Metadata } from 'next'
import './globals.css'

import { siteConfig } from '@/configs/site'
import { routing } from '@/i18n/routing'
import LayoutProvider from '@/libs/common/LayoutProvider'
import { ReactQueryProvider } from '@/libs/providers'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
  }
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <ReactQueryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
