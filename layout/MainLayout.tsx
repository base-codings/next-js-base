import Head from 'next/head';

import Footer from '~/components/common/Footer';
import Header from '~/components/common/Header';
import { envConfig } from '~/config/env';
import { uiConfig } from '~/config/ui';
import useStoreGlobal from '~/store/useStoreGlobal';

export default function MainLayout({ children, title = '', currentPage = '' }) {
  const titlePage = title ? `${uiConfig.title} - ${title}` : uiConfig.title;
  const description = uiConfig.description;
  const thumbnail = envConfig.CLIENT_URI + '/imgs/thumbnail.png';

  const isStorePage = useStoreGlobal((state) => state.isStorePage);

  return (
    <>
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-BDHNFW2Q5M" />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}gtag('js', new Date()); gtag('config', 'G-BDHNFW2Q5M');",
        }}
      ></script> */}
      <Head>
        <title>{titlePage}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={titlePage} />
        <meta name="title" content={titlePage} />
        <meta name="twitter:title" content={titlePage} />

        <meta itemProp="image" content={thumbnail} />
        <meta property="og:image" content={thumbnail} />
        <meta name="twitter:image" content={thumbnail} />

        <meta name="og:image:alt" content={titlePage} />
        <meta property="og:url" content={typeof window != 'undefined' ? window.location.href : ''} />
        <meta
          property="og:tag"
          content={`${uiConfig.tags?.map((item: string) => {
            return item;
          })}`}
        />

        <meta name="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={uiConfig.title} />
        <meta name="apple-mobile-web-app-title" content={uiConfig.title} />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <meta name="theme-color" content="#2b1718" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <div className="min-h-screen flex flex-col relative">
        <Header currentPage={currentPage} />
        <main
          className="flex-1 w-full flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center relative"
          style={{
            backgroundImage: `url(/images/${isStorePage ? 'store-background' : 'customer-background'}.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-[0.7] z-0"></div>
          <div className="flex-1 w-full flex flex-col justify-center items-center relative z-10">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
