import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
  <Html lang="en">
    <Head>
      <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon.ico" rel="icon" sizes="48x48" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
      <meta content="#7c3aed" name="theme-color" />
    </Head>
    <body className="antialiased">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
