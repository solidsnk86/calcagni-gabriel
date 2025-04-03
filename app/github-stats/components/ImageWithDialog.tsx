import { closeDialog, showDialog } from '@/utils/dialog';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ImageWithDialogProps {
  children: ReactNode;
  className: string;
  imageInfo: string;
  href: string;
  linkName: string;
}

export const ImageWithDialog: React.FC<Partial<ImageWithDialogProps>> = ({
  children,
  className,
  imageInfo,
  href,
  linkName,
}) => {
  return (
    <div
      className={className}
      onClick={() =>
        showDialog({
          content: (
            <>
              <X
                className="absolute top-2 right-2 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 cursor-pointer rounded-md"
                onClick={closeDialog}
              />
              {children}
              <aside className="flex justify-between px-2">
                <small className="flex mx-auto justify-center my-3">
                  {imageInfo || ''}
                </small>
                <Link
                  title={`Ver repo ${linkName}`}
                  href={href as string}
                  className="hover:underline"
                >
                  {linkName}
                </Link>
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
