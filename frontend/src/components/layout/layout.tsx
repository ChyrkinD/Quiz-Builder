import type { FC, ReactNode } from 'react';

import { Header } from '~/components/header/header';

type Properties = {
  children: ReactNode;
};

const Layout: FC<Properties> = ({ children }) => (
  <>
    <Header />
    <main className="mx-auto flex w-full max-w-188 flex-col gap-4 px-4 pt-5 pb-16 sm:gap-6 sm:pt-10">
      {children}
    </main>
  </>
);

export { Layout };
