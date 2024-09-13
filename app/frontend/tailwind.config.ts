import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './packages/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: { '3xl': '1680px' },
      boxShadow: {
        custom: '0 4px 16px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-animated'),
  ],
};
export default config;
