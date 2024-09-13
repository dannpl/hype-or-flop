'use client';

import Link from 'next/link';
import { IconX } from '@/components/Icons/IconX';

import IconDocs from '../Icons/IconDocs';
import { IconDiscord } from '../Icons/IconDiscord';

export function Footer() {
  // const pathname = usePathname();

  const links = [
    { href: '', icon: <IconX /> },
    { href: '', icon: <IconDocs /> },
    { href: '', icon: <IconDiscord /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-20 mt-1 flex h-9 w-full items-center justify-center border-b-0 border-white/10 bg-triad-dark-400 bg-none pb-10 pl-3 pt-3 lg:mt-0 lg:justify-start lg:border-t lg:py-0">
      <div className="my-auto flex size-full items-center justify-center divide-x-2 divide-white/10 pt-4 lg:pt-0">
        <div className="flex h-full items-center justify-between space-x-2 px-2 lg:space-x-4 lg:px-4">
          {links.map((item, key) => (
            <Link
              key={key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </Link>
          ))}
        </div>

        <div className="flex h-full items-center pl-4 pr-10 text-xs">
          <img
            className="h-5 w-20 object-cover"
            src="/assets/img/logo.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
