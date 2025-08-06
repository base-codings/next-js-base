import { envConfig } from '@/utils'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'Omelet',
  description:
    'Omelet is a decentralized meme market powered by AI, where users can create, trade, and predict the value of memes in a fun and engaging way. Join the revolution in meme culture and finance with Omelet.',
  keywords: 'Omelet, meme market, decentralized, AI, memes, trade memes, predict memes, meme culture, finance',
  url: envConfig.APP_URL || 'http://localhost:3000',
  ogImage: `${envConfig.APP_URL + '/imgs/og-image.jpg'}`,
}
