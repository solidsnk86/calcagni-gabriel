"use client";

import { Footer } from "@/components/Footer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useMatchMedia from "../hooks/useMatchMedia";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useIsClient } from "../hooks/useIsClient";
import AnimatedLayout from "@/components/AnimatedLayouts";

export default function Works() {
  const isClient = useIsClient();

  const mobile = useMatchMedia("(max-width: 700px)", false);
  return (
    isClient && (
      <AnimatedLayout>
        <main className="w-full md:pt-0 pt-20">
          <section className="flex flex-col flex-1 max-w-4xl justify-center mx-auto px-3">
            <div className="px-3 py-3 bg-zinc-900/50 border-foreground/5 border rounded-xl mt-5">
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
                <Masonry gutter={mobile ? "0.5rem" : "0.8rem"}>
                  {[
                    {
                      name: "ChismeApp",
                      url: "https://gossip-app.vercel.app/",
                      image: "/Portada-ChismeApp.png",
                      type: "Social",
                    },
                    {
                      name: "SolidSnk86",
                      url: "https://portfolio-mgc.vercel.app/",
                      image: "/Portada-Portfolio-Solid.png",
                      type: "Portfolio",
                    },
                    {
                      name: "NeoTecs",
                      url: "https://neotecs.vercel.app/",
                      image: "/Portada-NeoTecs.png",
                      type: "Documentación Web",
                    },
                    {
                      name: "Web LLM IA",
                      url: "https://solidsnk86.github.io/web-Llm-local/",
                      image: "/Portada-Web-LLM-AI.png",
                      type: "GPT Chat",
                    },
                    {
                      name: "Gerardo",
                      url: "https://cv-gec.vercel.app/",
                      image: "/Portada-CV-Gerardo.png",
                      type: "Portfolio",
                    },
                    {
                      name: "Facturador Web",
                      url: "https://solidsnk86.github.io/formularioWeb/",
                      image: "/Portada-Formulario-Web.png",
                      type: "Facturación",
                    },
                  ].map((proyect, index) => (
                    <Link
                      key={index}
                      href={proyect.url}
                      target="_blank"
                      className="relative p-3 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-xl text-left border border-foreground/5 work-icon-hover"
                    >
                      <img
                        src={proyect.image}
                        className="rounded-xl aspect-auto grayscale hover:grayscale-0 transition-all duration-500"
                        width="100%"
                        height={100}
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
