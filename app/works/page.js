"use client";

import { Footer } from "@/components/Footer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useMatchMedia from "../hooks/useMatchMedia";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useIsClient } from "../hooks/useIsClient";
import AnimatedLayout from "@/components/AnimatedLayouts";
import { worksProyects } from "@/components/constants";
import Image from "next/image";

export default function Works() {
  const isClient = useIsClient();
  const mobile = useMatchMedia("(max-width: 700px)", false);

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
                  Mi Top 6 de Proyectos {stats}
                </h3>
                {mobile ? null : (
                  <button
                    className="absolute top-4 left-4 ramdomize hover:opacity-80"
                    onClick={async () => {
                      const grid = document.querySelector(".grid");

                      function shuffleItems(items) {
                        return Array.from(items)
                          .map((value) => ({ value, sort: Math.random() }))
                          .sort((a, b) => a.sort - b.sort)
                          .map(({ value }) => value);
                      }

                      const shuffledItems = shuffleItems(grid.children);

                      await document.startViewTransition(() => {
                        grid.replaceChildren(...shuffledItems);
                      });
                    }}
                  >
                    Mezclar
                  </button>
                )}
              </header>
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 400: 1, 700: 1, 900: 3 }}
              >
                <Masonry gutter={mobile ? "0.5rem" : "0.8rem"} className="grid">
                  {worksProyects.map((proyect, index) => (
                    <Link
                      key={index}
                      href={proyect.url}
                      target="_blank"
                      data-item={index}
                      style={{ viewTransitionName: `item${index}` }}
                      className={`item item${index} relative p-3 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-xl text-left border border-foreground/5 work-icon-hover grayscale hover:grayscale-0 transition-all duration-500`}
                    >
                      <Image
                        src={proyect.image}
                        className="rounded-xl"
                        layout="responsive"
                        width={16}
                        height={9}
                        alt={proyect.name}
                        priority
                      />

                      <div className="mt-3">
                        <h3 className="font-medium">{proyect.name}</h3>
                        <p className="text-zinc-400 text-sm">{proyect.type}</p>
                        <aside className="bg-zinc-800/40 w-fit py-[8px] px-[10px] rounded-full absolute right-2 bottom-3 border border-foreground/5 overflow-hidden">
                          <ArrowRight className="w-5 h-5 inline work-arrow-icon-1" />
                          <ArrowRight className="w-5 h-5 work-arrow-icon-2" />
                        </aside>
                      </div>
                    </Link>
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
