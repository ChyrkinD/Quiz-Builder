import localFont from 'next/font/local';

export const nunito = localFont({
  src: './nunito/nunito-latin-variable.woff2',
  weight: '200 1000',
  style: 'normal',
  display: 'swap',
  variable: '--font-nunito',
});
