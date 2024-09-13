import Image from 'next/image';
import Logo from '@/assets/svg/logo-secondaryl.png';

export function Loading() {
  return (
    <div className="fixed left-0 top-0 z-30 flex size-full items-center justify-center bg-triad-dark-400 ">
      <Image
        className="animate-jump animate-duration-1000 animate-infinite animate-ease-linear"
        width={140}
        height={140}
        alt="Triad logo triangle"
        src={Logo}
      />
    </div>
  );
}
