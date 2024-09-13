import Link from 'next/link';

const Markets: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center pb-40 pt-8 lg:py-20">
      <button className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600 transition-all">
        Create Market
      </button>
    </div>
  );
};

export default Markets;
