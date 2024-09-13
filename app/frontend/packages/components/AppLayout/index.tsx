import type { ReactNode } from 'react';
import { ToastContainer as Toast } from 'react-toastify';
import { cn } from 'utils/cn';
import { Header } from '../Header';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../Footer';

export type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex h-[calc(100%-74px)] w-full flex-col justify-between bg-triad-dark-400 lg:h-full">
      <Header />
      <Toast />
      <div className={cn('mx-auto w-full max-w-[1330px] px-4 pt-[100px]')}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
