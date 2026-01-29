export const SkeletonSlide = () => (
  <div className="flex justify-center items-center bg-[var(--gray-7)] w-full h-screen animate-pulse-fast">
    <div className="space-y-8 px-6 w-full max-w-4xl text-center">
      <div className="bg-[var(--gray-6)] mx-auto rounded-full w-32 h-8"></div>
      <div className="space-y-4">
        <div className="bg-[var(--gray-6)] mx-auto rounded-lg w-3/4 h-16"></div>
        <div className="bg-[var(--gray-6)] mx-auto rounded-lg w-1/2 h-16"></div>
      </div>
      <div className="gap-8 grid grid-cols-2 pt-8">
        <div className="bg-[var(--gray-6)] rounded-xl h-64"></div>
        <div className="bg-[var(--gray-6)] rounded-xl h-64"></div>
      </div>
    </div>
  </div>
);
