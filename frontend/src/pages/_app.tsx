import '~/assets/css/globals.css';

import type { AppProps } from 'next/app';

import { nunito } from '~/assets/fonts/fonts';
import { Layout, ToastProvider } from '~/components/components';

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`${nunito.variable} min-h-screen font-sans`}>
    <ToastProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  </div>
);

export default App;
