export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex w-[100%] h-[100%] p-[1.5px]">
      <span
        className={`loader ${className} border-t-neutral-400/50 border-l-neutral-400/50 border-r-neutral-400/50 border-b-violet-400/60 border-[6px]`}
      ></span>
    </div>
  );
};
