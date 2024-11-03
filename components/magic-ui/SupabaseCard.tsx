export const SupabaseCard = () => {
  return (
    <>
      <a
        className="group relative -ml-px -mt-px flex w-1/2 flex-none items-center justify-center border bg-gray-950 py-8 transition-[border-color,z-index] delay-150 hover:delay-0 hover:duration-300 focus:!z-[--focus-z] focus:transition-none sm:w-1/3 border-gray-800 z-0"
        style={{ zIndex: 0 }}
        href="/docs/integrations/databases/supabase"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]"></div>
        <div className="absolute inset-0" style={{}}></div>
        <div className="relative flex w-full flex-col items-center">
          <div className="relative aspect-[104/42] w-[calc(104/16*1rem)] max-w-full translate-y-4 transition-transform duration-300 group-hover:translate-y-0 group-focus:translate-y-0 no-hover:translate-y-0">
            <img
              alt=""
              loading="lazy"
              width="104"
              height="42"
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0"
              style={{ color: "transparent" }}
              src="/supabase-outline.5e976d92.svg"
            />
            <img
              alt=""
              loading="lazy"
              width="104"
              height="42"
              decoding="async"
              data-nimg="1"
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
              style={{ color: "transparent" }}
              src="/supabase.869a45fb.svg"
            />
          </div>
          <div className="mt-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-75 group-focus:opacity-100 group-focus:delay-75 no-hover:opacity-100">
            Supabase
          </div>
        </div>
      </a>
    </>
  );
};
