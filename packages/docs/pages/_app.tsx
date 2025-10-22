import {
  AlertsManager,
  createAlertsManager,
  GlobalStyles,
  Grid,
  GridItem,
} from '@bigcommerce/big-design';
import { createTheme } from '@bigcommerce/big-design-theme';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { SideNav, StoryWrapper } from '../components';
import { GTM_ID, isProd, pageView } from '../utils/analytics/gtm';

export const alertsManager = createAlertsManager();

const theme = createTheme();

const gridTemplate = {
  mobile: `
    "nav" ${theme.helpers.remCalc(80)}
    "main" min-content
    / 100%;
  `,
  tablet: `
    "nav main" 1fr
    / minmax(${theme.helpers.remCalc(210)}, ${theme.helpers.remCalc(300)}) 1fr;
  `,
};

const handleRouteChange = (url: string) => {
  pageView(url);
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link href={`${process.env.URL_PREFIX}/favicon.svg`} rel="icon" type="image/svg+xml" />
        <title>BigDesign</title>
        <meta content={`${process.env.URL_PREFIX}/og-image.png`} property="og:image" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style global jsx>
        {`
          body {
            min-height: 100vh;
            background-color: ${theme.colors.secondary10};
          }
        `}
      </style>
      {Boolean(isProd && GTM_ID) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            strategy="afterInteractive"
          />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GTM_ID}');
          `,
            }}
            strategy="afterInteractive"
          />
        </>
      )}
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <AlertsManager manager={alertsManager} />
          {router.query.noNav ? (
            <Component {...pageProps} />
          ) : (
            <Grid
              gridGap="0"
              gridTemplate={gridTemplate}
              marginHorizontal="auto"
              paddingHorizontal={{ tablet: 'medium' }}
              style={{
                minHeight: '100vh',
                maxWidth: '1400px',
                position: 'relative',
              }}
            >
              <SideNav />
              <GridItem
                as="main"
                gridArea="main"
                marginHorizontal={{ mobile: 'small', tablet: 'xxLarge' }}
                marginVertical="medium"
                paddingTop={{ tablet: 'large' }}
                style={{ maxWidth: '100%' }}
              >
                <StoryWrapper>
                  <Component {...pageProps} />
                </StoryWrapper>
              </GridItem>
            </Grid>
          )}
        </>
      </ThemeProvider>
    </>
  );
};

export default App;
