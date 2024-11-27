"use client";

import { Footer } from "@/components/Footer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useMatchMedia from "../hooks/useMatchMedia";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useIsClient } from "../hooks/useIsClient";
import AnimatedLayout from "@/components/AnimatedLayouts";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Works() {
  const isClient = useIsClient();
  const mobile = useMatchMedia("(max-width: 700px)", false);
  const [githubStats, setGithubStats] = useState([]);
  const [stars, setStars] = useState({});

  const getData = async () => {
    const response = await fetch("https://neotecs.vercel.app/api/github-stats");
    const stats = await response.json();
    setGithubStats(stats || []);
  };

  useEffect(() => {
    getData();
  }, []);

  const repos = githubStats.data?.repos || [];

  for (let i = 0; i < repos.length; i++) {
    stars[repos[i]?.name.toLowerCase()] = repos[i]?.stars;
  }

  const worksProyects = [
    {
      name: "ChismeApp",
      url: "https://gossip-app.vercel.app/",
      image: "/Portada-ChismeApp.png",
      type: "Social",
      repoName: "gossip-app",
      stars: 0,
    },
    {
      name: "SolidSnk86",
      url: "https://portfolio-mgc.vercel.app/",
      image: "/Portada-Portfolio-Solid.png",
      type: "Portfolio",
      repoName: "portfolioweb",
      stars: stars.portfolioweb || 0,
    },
    {
      name: "NeoTecs",
      url: "https://neotecs.vercel.app/",
      image: "/Portada-NeoTecs.png",
      type: "Documentación Web",
      repoName: "neotecs",
      stars: stars.neotecs || 0,
    },
    {
      name: "Web LLM IA",
      url: "https://solidsnk86.github.io/web-Llm-local/",
      image: "/Portada-Web-LLM-AI.png",
      type: "Chat GPT",
      repoName: "web-llm-local",
      stars: 0,
    },
    {
      name: "Gerardo",
      url: "https://cv-gec.vercel.app/",
      image: "/Portada-CV-Gerardo.png",
      type: "Portfolio",
      repoName: "cv-gec",
      stars: stars.cv_gec || 0,
    },
    {
      name: "Facturador Web",
      url: "https://solidsnk86.github.io/formularioWeb/",
      image: "/Portada-Formulario-Web.png",
      type: "Facturación",
      repoName: "formularioweb",
      stars: stars.formularioweb || 0,
    },
  ];

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
                <Masonry
                  gutter={mobile ? "0.5rem" : "0.8rem"}
                  className="grid relative"
                >
                  {worksProyects.map((proyect, index) => (
                    <Link
                      key={index}
                      href={proyect.url}
                      target="_blank"
                      data-item={index}
                      style={{ viewTransitionName: `item${index}` }}
                      className={`item item${index} relative group p-3 bg-zinc-900/50 hover:bg-btn-background-hover text-white rounded-xl text-left border border-foreground/5 work-icon-hover grayscale hover:grayscale-0 transition-all duration-500`}
                    >
                      <Image
                        src={proyect.image}
                        className="rounded-xl w-full h-auto aspect-auto"
                        width={1600}
                        height={900}
                        alt={proyect.name}
                        priority
                      />

                      <div className="mt-3">
                        <h3 className="font-medium">{proyect.name}</h3>
                        <div className="flex gap-1">
                          <p className="text-zinc-400 text-sm">
                            {proyect.type}
                          </p>
                          <small className=" text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ⭐{proyect.stars}
                          </small>
                        </div>
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