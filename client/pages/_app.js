// @ts-check
import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import Head from 'next/head';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { Fragment } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserContextProvider } from 'state';
import customTheme from 'style/theme';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Fragment>
      <Global
        styles={css`
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#1A202C'};
          }
          .react-datepicker-wrapper {
            display: block !important;
          }
        `}
      />
      {children}
    </Fragment>
  );
};

const handleRouteChangeStart = url => {
  NProgress.start();
};

const routeChangeComplete = url => {
  NProgress.done();
};

const routeChangeError = url => {
  NProgress.done();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnReconnect: true,
    },
  },
  queryCache: new QueryCache({
    onError: (err, query) => {
      console.log(err);
    },
  }),
});

const App = ({ Component, pageProps, router }) => {
  Router.events.on('routeChangeStart', handleRouteChangeStart);
  Router.events.on('routeChangeComplete', routeChangeComplete);
  Router.events.on('routeChangeError', routeChangeError);

  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Head>
        <title>Metamask Wallet App</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ColorModeProvider
        options={{
          initialColorMode: 'light',
          useSystemColorMode: false,
        }}
      >
        <GlobalStyle>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <Component {...pageProps} />
            </UserContextProvider>

            {/* dev tools */}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default App;
