export const envConfig = {
  isProduction: process.env.NODE_ENV === 'production',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:8080',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://api.omelet',
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID ? Number(process.env.NEXT_PUBLIC_CHAIN_ID) : 1315,

  PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? '',
  PRIVY_APP_SECRET: process.env.NEXT_PUBLIC_PRIVY_APP_SECRET ?? '',
  RPC_URL_DEVNET: process.env.NEXT_PUBLIC_RPC_URL_DEVNET ?? 'https://api.devnet.solana.com',
  RPC_URL_MAINNET: process.env.NEXT_PUBLIC_RPC_URL_MAINNET ?? 'https://api.mainnet-beta.solana.com',
  EXPLORER_URL: process.env.NEXT_PUBLIC_EXPLORER_URL ?? '',
  X_URL: process.env.NEXT_PUBLIC_X_URL ?? '',
  TELEGRAM_URL: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '',
  BITQUERY_TOKEN: process.env.NEXT_PUBLIC_BITQUERY_TOKEN ?? '',
  BITQUERY_ENDPOINT: process.env.NEXT_PUBLIC_BITQUERY_ENDPOINT ?? 'https://streaming.bitquery.io/eap',
  CODEX_API_KEY: process.env.NEXT_PUBLIC_CODEX_API_KEY ?? '',
}
