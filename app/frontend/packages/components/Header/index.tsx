'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from 'utils/cn';
import Link from 'next/link';

export function Header() {
  const [bgHeader, setBgHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setBgHeader(true);
      } else {
        setBgHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn('fixed left-0 top-0 z-30 h-[76px] w-full', {
        'bg-[#13141A1A] backdrop-blur-xl': bgHeader,
      })}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4 max-[768px]:py-2 lg:max-w-[1330px] lg:px-4">
        <Link href="/">
          <Image
            width={80}
            height={60}
            className="object-cover"
            src="/assets/img/logo-secondary.png"
            alt="napcat-logo"
          />
        </Link>
      </div>
    </header>
  );
}
