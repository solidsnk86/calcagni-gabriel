import useMatchMedia from '@/app/hooks/useMatchMedia';
import { closeDialog, showDialog } from '@/utils/dialog';
import { Github, MoveRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ImageWithDialogProps {
  children: ReactNode;
  className: string;
  imageInfo: string;
  href: string;
  link: string;
  repoName: string;
  techs: Array<string>;
}

export const ImageWithDialog: React.FC<Partial<ImageWithDialogProps>> = ({
  children,
  className,
  imageInfo,
  href,
  link,
  repoName,
  techs,
}) => {
  const mobile = useMatchMedia('(max-width: 762px)', true);
  return (
    <div
      className={className}
      onClick={() =>
        showDialog({
          dialogWidth: mobile ? '100%' : '50%',
          content: (
            <>
              <X
                className="absolute top-2 right-2 dark:bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-md"
                onClick={closeDialog}
              />
              <article className="pt-6">{children}</article>
              <div className="flex w-full gap-2 mt-2 overflow-x-auto">
                {techs?.map((item) => (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))]">
                    <small className="py-1 px-2 text-center bg-zinc-800 transition-colors line-clamp-1 text-white rounded-lg border border-zinc-700/50 ">
                      {item}
                    </small>
                  </div>
                ))}
              </div>
              <footer className="flex flex-col">
                <small className="my-3">{imageInfo}</small>
                <aside className="flex gap-3 md:justify-evenly relative z-50 items-center text-zinc-500">
                  <Link
                    href={href!}
                    className="flex justify-end items-center gap-1 group text-sm"
                  >
                    <Image
                      src="/globe.svg"
                      className="inline-flex my-3"
                      width={18}
                      height={18}
                      alt="Icono Planeta"
                    />
                    Ver {link}
                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <Link
                    title={`Ver repo ${repoName}`}
                    href={href!}
                    className="flex justify-end items-center gap-1 group text-sm"
                  >
                    <Github className="inline-flex w-5 h-5 my-3" /> Código
                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </aside>
              </footer>
            </>
          ),
        })
      }
    >
      {children}
    </div>
  );
};
