import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { ServerStyleSheet } from 'styled-components';

import { GTM_ID, GTM_URL } from '../utils/analytics/gtm';

const isProd = process.env.NODE_ENV === 'production';

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    resetServerContext();

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        {this.renderGTM()}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  private renderGTM() {
    return isProd ? (
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={GTM_URL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GTM_ID}');
                  `,
          }}
        />
      </Head>
    ) : (
      <Head />
    );
  }
}
