'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerRoutes } from './constants';

export const Footer = ({
  className,
}: {
  className?: string;
  user: boolean;
}) => {
  const pathname = usePathname();

  return (
    <footer
      className={`w-full p-8 justify-around text-center text-base text-zinc-400 flex ${className} items-center`}
    >
      <a
        href="https://github.com/solidsnk86"
        target="_blank"
        rel="noreferrer"
        className="md:flex hover:brightness-150 transition-all duration-300"
      >
        SolidSnk86 &copy; 2024
      </a>
      <aside className="flex px-2 py-[6px] gap-3 font-medium footer-menu bg-violet-800/20 md:bg-transparent items-center">
        {footerRoutes.map((link, index) => (
          <Link
            key={index}
            href={link.link}
            className={`hover:opacity-60 transition-all duration-300 h-full ${
              pathname === link.link
                ? 'bg-violet-400/60 rounded-full px-2 py-1 md:py-0 md:px-0 md:bg-transparent md:text-violet-400 text-foreground'
                : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </aside>
    </footer>
  );
};
