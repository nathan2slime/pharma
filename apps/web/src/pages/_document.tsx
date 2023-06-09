import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <title>Pharm</title>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link rel="shortcut icon" href="./pharm.svg" type="image/x-icon" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito&family=Ubuntu&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://cdn.jsdelivr.net/npm/remixicon@3.0.0/fonts/remixicon.css"
              rel="stylesheet"
            />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
