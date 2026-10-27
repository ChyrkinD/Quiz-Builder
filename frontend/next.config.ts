import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
      '*.svg': {
        condition: { query: '?react' },
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false,
              svgProps: { fill: 'currentColor' },
              svgoConfig: {
                plugins: [
                  { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
                ],
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  redirects: () => Promise.resolve([{ source: '/', destination: '/quizzes', permanent: false }]),
};

export default nextConfig;
