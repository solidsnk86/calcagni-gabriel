'use client';

import { Footer } from '@/components/Footer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import useMatchMedia from '../hooks/useMatchMedia';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { useIsClient } from '../hooks/useIsClient';
import AnimatedLayout from '@/components/AnimatedLayouts';
import Image from 'next/image';
import { worksProyects } from '@/components/constants';
import { useEffect, useState } from 'react';
import { ImageWithDialog } from '../github-stats/components/ImageWithDialog';

export default function Works() {
  const isClient = useIsClient();
  const mobile = useMatchMedia('(max-width: 700px)', true);
  const [delayed, setDelayed] = useState(mobile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(mobile);
    }, 100);

    return () => clearTimeout(timer);
  }, [mobile]);

  return (
    isClient && (
      <AnimatedLayout>
        <main className="w-full md:pt-0 pt-20">
          <section className="flex flex-col flex-1 max-w-4xl justify-center mx-auto px-3">
            <div className="px-3 py-3 bg-zinc-900/50 border-foreground/5 border rounded-xl mt-5 relative">
              <header className="text-center p-6">
                <p className="text-gray-400">
                  <BriefcaseBusiness className="inline mr-2 -translate-y-[2px] text-violet-400" />
                  Mis Trabajos
                </p>
                <h3 className="text-white text-lg font-bold">
                  Mi Top 6 de Proyectos
                </h3>
              </header>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 3 }}
              >
                <Masonry
                  gutter={mobile ? '0.5rem' : '0.8rem'}
                  className="grid relative"
                >
                  {worksProyects.map((proyect, index) => (
                    <ImageWithDialog
                      key={proyect.name}
                      imageInfo={proyect.description}
                      href={proyect.url}
                      link={proyect.name}
                      repoName={proyect.repoName}
                      techs={proyect.techs}
                      className={`item relative group p-3 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-xl text-left border border-foreground/5 work-icon-hover grayscale hover:grayscale-0 transition-all duration-500`}
                    >
                      <Image
                        src={proyect.image}
                        className="rounded-xl w-full h-auto aspect-auto"
                        width={1600}
                        height={600}
                        alt={proyect.name}
                        priority
                      />

                      <div className="mt-3">
                        <h3 className="font-medium">{proyect.name}</h3>
                        <div className="flex gap-1">
                          <p className="text-zinc-400 text-sm">
                            {proyect.type}
                          </p>
                        </div>
                        <aside className="bg-zinc-800/40 w-fit py-[8px] px-[10px] rounded-full absolute right-2 bottom-3 border border-foreground/5 overflow-hidden">
                          <ArrowRight className="w-5 h-5 inline work-arrow-icon-1" />
                          <ArrowRight className="w-5 h-5 work-arrow-icon-2" />
                        </aside>
                      </div>
                    </ImageWithDialog>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>
          </section>
          <Footer />
        </main>
      </AnimatedLayout>
    )
  );
}
