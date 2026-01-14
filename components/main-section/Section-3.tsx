import { Drama } from 'lucide-react';
import { ReviewsMarquee } from '../magic-ui/ReviewsMarquee';
import React from 'react';
import { Section_3PropsOptional } from '@/app/types/definitions';
import Link from 'next/link';

export const Section_3: React.FC<Section_3PropsOptional> = ({
  data,
  id,
  className,
}) => {
  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
    >
      <header className="text-center border-b border-foreground/5">
        <div className="p-6">
          <p className="text-gray-400">
            <Drama className="inline mr-1 -translate-y-[2px] text-violet-400 w-5 h-[18px]" />
            Comentarios
          </p>
          <h3 className="text-white text-lg font-bold">Críticas y Reseñas</h3>
        </div>
      </header>
      <aside className="relative overflow-hidden h-[331px]">
        <div className="flex mx-auto justify-center px-2">
          <ReviewsMarquee key={id} data={data} />
          <div className="shadow-top"></div>
          <div className="shadow-bottom"></div>
        </div>
        <Link
          href="/login"
          className="absolute inset-0 z-10 flex items-end justify-center pb-4 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity"
          title="Inicia sesión para comentar y dejar tu feedback! 😃"
        >
          <span className="text-sm text-zinc-300 bg-zinc-800/80 px-3 py-1 rounded-full border border-foreground/10">
            Inicia sesión para comentar
          </span>
        </Link>
      </aside>
    </section>
  );
};
