import Link from 'next/link';

const Markets: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center pb-40 pt-8 lg:py-20">
      <h1 className="mb-5 text-center text-2xl font-medium text-white lg:text-[40px]">
        Speculate <span className="font-light">the</span>{' '}
        <span className="border-b border-dashed border-triad-green-200">
          Growth
        </span>{' '}
        <span className="font-light">/</span>{' '}
        <span className="border-b border-dashed border-triad-red-300">
          Decline
        </span>{' '}
        <span className="font-light">of</span> projects
      </h1>

      <h2 className="mb-14 items-center gap-x-1.5 text-center text-sm text-gray-500 lg:flex lg:text-base">
        Important: send tokens only Important: send tokens onlyImportant: send
        tokens only Important: send tokens only
        <Link
          className="flex items-center justify-center text-triad-azure-200 hover:underline"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          How it works{' '}
          <img className="ml-1" src="assets/svg/icon-link.svg" alt="" />
        </Link>
      </h2>
    </div>
  );
};

export default Markets;
