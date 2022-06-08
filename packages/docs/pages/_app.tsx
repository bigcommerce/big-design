import { AlertsManager, createAlertsManager, GlobalStyles, Grid, GridItem } from '@bigcommerce/big-design';
import { createTheme } from '@bigcommerce/big-design-theme';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { UIDFork, UIDReset } from 'react-uid';
import { ThemeProvider } from 'styled-components';

import { BetaRibbon, SideNav, StoryWrapper } from '../components';
import { GTM_ID, isProd, pageView } from '../utils/analytics/gtm';

export const alertsManager = createAlertsManager();

const theme = createTheme();

const gridTemplate = {
  mobile: `
    "nav" 80px
    "main" min-content
    / 100%;
  `,
  tablet: `
    ". nav main ." 1fr
    / 1fr 210px minmax(0, 1050px) 1fr;
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
        <link rel="icon" type="image/svg+xml" href={`${process.env.URL_PREFIX}/favicon.svg`} />
        <title>BigDesign</title>
        <meta property="og:image" content={`${process.env.URL_PREFIX}/og-image.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>
        {`
          html,
          body,
          #__next {
            height: 100%;
          }
        `}
      </style>
      {isProd && GTM_ID && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GTM_ID}');
          `,
            }}
          />
        </>
      )}
      <UIDReset>
        <UIDFork>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <AlertsManager manager={alertsManager} />
              {router.query.noNav ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <Grid
                    gridTemplate={gridTemplate}
                    backgroundColor="secondary10"
                    gridGap="0"
                    style={{ minHeight: '100%' }}
                  >
                    <GridItem gridArea="nav" paddingTop="medium">
                      <SideNav />
                    </GridItem>
                    <GridItem
                      gridArea="main"
                      marginVertical="medium"
                      marginHorizontal={{ mobile: 'small', tablet: 'xxLarge' }}
                      paddingTop="large"
                      style={{ maxWidth: '100%' }}
                    >
                      <StoryWrapper>
                        <Component {...pageProps} />
                      </StoryWrapper>
                    </GridItem>
                  </Grid>
                  <BetaRibbon />
                </>
              )}
            </>
          </ThemeProvider>
        </UIDFork>
      </UIDReset>
    </>
  );
};

export default App;
