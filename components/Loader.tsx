interface LoaderProps {
  className?: string;
  width: number | `${number}px`;
  height: number;
}

export const Loader = ({ className, width, height }: LoaderProps) => {
  return (
    <div className="flex w-[100%] h-[100%] p-[1.5px]">
      <span
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`loader ${className} border-t-neutral-400/50 border-l-neutral-400/50 border-r-neutral-400/50 border-b-violet-400/60 border-[6px]`}
      ></span>
    </div>
  );
};
