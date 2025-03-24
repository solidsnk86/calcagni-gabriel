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
    <Link
      href="/login"
      className={`border border-foreground/5 bg-zinc-900/50 rounded-xl overflow-hidden ${className}`}
      title="Inicia sesión para comentar y dejar tu feedback! 😃"
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
      <aside className="relative overflow-hidden h-[331px] hover:bg-zinc-900/50 transition-colors">
        <div className="flex mx-auto justify-center px-2">
          <ReviewsMarquee key={id} data={data} />
          <div className="shadow-top"></div>
          <div className="shadow-bottom"></div>
        </div>
      </aside>
    </Link>
  );
};
