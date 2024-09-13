const Loading: React.FC = () => {
  return (
    <div className="flex flex-col pt-20">
      <div className="flex w-full flex-col items-center">
        <div className="animate-loading mb-5 h-[29px] w-full max-w-[400px] rounded" />

        <div className="animate-loading mb-5 h-12 w-full max-w-[800px] rounded" />

        <div className="animate-loading mb-6 h-5 w-full max-w-[650px] rounded" />

        <div className="animate-loading mb-14 h-5 w-full max-w-[140px] rounded" />

        <div className="animate-loading h-[134px] w-full rounded" />
      </div>

      <div className="mt-14 flex w-full gap-3">
        <div className="animate-loading h-12 w-[380px] rounded-full" />

        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="h-12 w-28 animate-pulse rounded-full bg-triad-gray-600"
          />
        ))}
      </div>

      <div className="mt-10 h-8 w-full animate-pulse rounded bg-triad-gray-600" />

      <div className="mt-1 flex animate-pulse flex-col gap-y-4 pt-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-14 w-full animate-pulse rounded bg-triad-gray-600"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
