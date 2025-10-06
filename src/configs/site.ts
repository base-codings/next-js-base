import { envConfig } from './envConfig'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
    title: 'Title',
    description: 'Description',
    keywords: ['Keyword1', 'Keyword2'],
    url: envConfig.APP_URL,
    ogImage: `${envConfig.APP_URL + '/imgs/og-image.jpg'}`,
}
