import { closeDialog, showDialog } from '@/utils/dialog';
import { Github, Globe, MoveRight, X } from 'lucide-react';
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
  return (
    <div
      className={className}
      onClick={() =>
        showDialog({
          content: (
            <>
              <X
                className="absolute top-2 right-2 text-red-500 dark:bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-md"
                onClick={closeDialog}
              />
              <main className="pt-5">{children}</main>
              <div className="flex justify-start gap-2 mt-2">
                {techs?.map((item) => (
                  <div className="flex">
                    <small className="py-1 px-2 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-lg border border-foreground/5">
                      {item}
                    </small>
                  </div>
                ))}
              </div>
              <aside className="flex flex-col">
                <small className="my-3">{imageInfo}</small>
                <div className="flex justify-evenly items-center">
                  <Link
                    href={href as string}
                    className="hover:underline flex justify-end items-center gap-1 group text-sm"
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
                    href={href as string}
                    className="hover:underline flex justify-end items-center gap-1 group text-sm"
                  >
                    <Github className="inline-flex w-5 h-5 my-3" /> Código
                    <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </aside>
            </>
          ),
        })
      }
    >
      {children}
    </div>
  );
};
