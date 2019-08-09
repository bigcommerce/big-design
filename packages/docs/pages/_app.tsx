import { GlobalStyles, Grid } from '@bigcommerce/big-design';
import { createTheme } from '@bigcommerce/big-design-theme';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { StoryWrapper } from '../components';
import { SideNav } from '../components/SideNav';

const theme = createTheme();

const gridTemplate = `
  "nav main" 1fr
  / 210px 1fr;
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <link rel="icon" type="image/png" href={`${process.env.URL_PREFIX}/static/favicon.png`}></link>
          <title>BigDesign</title>
        </Head>
        <style jsx global>
          {`
            @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');

            html,
            body,
            #__next {
              height: 100%;
            }
          `}
        </style>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyles />
            <Grid gridTemplate={gridTemplate} backgroundColor="secondary10" gridGap="0" style={{ minHeight: '100%' }}>
              <Grid.Item gridArea="nav" shadow="raised">
                <SideNav />
              </Grid.Item>
              <Grid.Item
                gridArea="main"
                marginVertical="medium"
                marginHorizontal="xxLarge"
                style={{ maxWidth: '100%' }}
              >
                <StoryWrapper>
                  <Component {...pageProps} />
                </StoryWrapper>
              </Grid.Item>
            </Grid>
          </>
        </ThemeProvider>
      </Container>
    );
  }
}
