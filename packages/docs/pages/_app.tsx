import {
  AlertsManager,
  createAlertsManager,
  GlobalStyles,
  Grid,
  GridItem,
} from '@bigcommerce/big-design';
import { createTheme } from '@bigcommerce/big-design-theme';
import App from 'next/app';
import Head from 'next/head';
import { default as Router } from 'next/router';
import React from 'react';
import { UIDFork, UIDReset } from 'react-uid';
import { ThemeProvider } from 'styled-components';

import { BetaRibbon, SideNav, StoryWrapper, TabWrapper } from '../components';
import { pageView } from '../utils/analytics/gtm';

Router.events.on('routeChangeComplete', (url) => pageView(url));

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

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

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
        <style global jsx>
          {`
            html,
            body,
            #__next {
              height: 100%;
            }
          `}
        </style>
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
                      backgroundColor="secondary10"
                      gridGap="0"
                      gridTemplate={gridTemplate}
                      style={{ minHeight: '100%' }}
                    >
                      <GridItem gridArea="nav" paddingTop="medium">
                        <SideNav />
                      </GridItem>
                      <GridItem
                        gridArea="main"
                        marginHorizontal={{ mobile: 'small', tablet: 'xxLarge' }}
                        marginVertical="medium"
                        paddingTop="large"
                        style={{ maxWidth: '100%' }}
                      >
                        <StoryWrapper>
                          <TabWrapper>
                            <Component {...pageProps} />
                          </TabWrapper>
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
  }
}
