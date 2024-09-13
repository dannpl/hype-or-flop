import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { AppLayout } from '@/components/AppLayout';
import './globals.css';
import { cn } from 'utils/cn';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NapCat',
  description: '',
  icons: [
    {
      url: '/assets/favicon/favicon.ico',
      href: '/assets/favicon//favicon.ico',
      sizes: '32x32',
      type: 'image/x-icon',
    },
    {
      url: '/assets/favicon/apple-touch-icon.png',
      href: '/assets/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      url: '/assets/favicon/favicon-32x32.png',
      href: '/assets/favicon/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/assets/favicon/favicon-16x16.png',
      href: '/assets/favicon/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/assets/favicon/site.webmanifest',
      href: '/assets/favicon/site.webmanifest',
      rel: 'manifest',
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="h-full" lang="en">
      <body
        className={cn(dmSans.className, 'lg:h-auto min-h-full bg-[#070b13]')}
      >
        <AppLayout>
          <NextTopLoader
            color="#3961FB"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3961FB,0 0 5px #3961FB"
          />
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
