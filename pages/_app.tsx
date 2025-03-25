import '~/public/styles/globals.scss';
import queryClient from '~/core/queryClient';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Progress } from '~/components/progress';
import { useProgressStore } from '~/store';
import ModalProvider from '../context/ModalContext/ModalProvider';
import GlobalProvider from '../context/GlobalContext/GlobalProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '~/utils/createEmotionCache';
import { AppGlobalStyles } from '~/context/AppGlobalStyle';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } }: MyAppProps) {
  const setIsAnimating = useProgressStore((state) => {
    if (state) {
      return state.setIsAnimating;
    }
  });
  const isAnimating = useProgressStore((state) => {
    if (state) {
      return state.isAnimating;
    }
  });
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Progress isAnimating={isAnimating} />
          <AnimatePresence>
            <Toaster />
          </AnimatePresence>
          <AppGlobalStyles>
            <GlobalProvider>
              <ModalProvider>
                <Component {...pageProps} />
              </ModalProvider>
            </GlobalProvider>
          </AppGlobalStyles>
        </QueryClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

export default MyApp;
