import type { ReactNode } from 'react';
import { ToastContainer as Toast } from 'react-toastify';
import { cn } from 'utils/cn';
import 'react-toastify/dist/ReactToastify.css';

export type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative flex w-full flex-col justify-between bg-triad-dark-400 h-full">
      <div className="bg-black/70 absolute left-0 top-0 z-10 w-full h-full"></div>

      <img
        src="/assets/img/bg.webp"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <Toast />
      <div className={cn('mx-auto w-full max-w-[1330px] px-4 pt-[100px] z-20')}>
        {children}
      </div>
    </div>
  );
}
