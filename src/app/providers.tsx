import { LOCALE_KEY } from '@/configs/constant'
import { ReactQueryProvider } from '@/libs'
import LayoutProvider from '@/libs/common/LayoutProvider'
import { LinguiProvider } from '@/libs/providers/LinguiProvider'
import { allMessages } from '@/translations/appRouterI18n'
import { cookies } from 'next/headers'
import { PreloadResources } from './preload-resources'

export default async function AppProviders({ children }: { children: React.ReactNode }) {
    // Ensure that the incoming `locale` is valid
    const cookieStore = await cookies()
    const locale = cookieStore.get(LOCALE_KEY)?.value || 'en'

    return (
        <html lang={locale}>
            <PreloadResources />
            <body className="antialiased">
                <LinguiProvider initialLocale={locale} initialMessages={allMessages[locale]!}>
                    <ReactQueryProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </ReactQueryProvider>
                </LinguiProvider>
            </body>
        </html>
    )
}
