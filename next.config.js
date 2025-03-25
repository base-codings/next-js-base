const withPWA = require('next-pwa');

const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.NEXT_PUBLIC_BUNDLE_ANALYZE,
});

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  const nodeEnv = (() => {
    if (isProd) return 'production';
    return 'development';
  })();

  console.log('🚀🚀 ENV: ', nodeEnv);

  const configWithPwa = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  }); // other config options});

  // next.config.js object
  const analyzer = bundleAnalyzer({
    sassOptions: {
      // includePaths: ['./styles'],
      prependData: `@import "./public/styles/base.scss";`,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    experimental: {
      // outputStandalone: true,
      // appDocumentPreloading: true,
      // adjustFontFallbacks: true,
    },
    output: 'standalone',
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    i18n: {
      locales: ['default', 'en', 'ar'],
      defaultLocale: 'default',
      localeDetection: false,
    },
    trailingSlash: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });

      return config;
    },
  });

  return {
    // ...configWithPwa,
    ...analyzer,
  };
};
