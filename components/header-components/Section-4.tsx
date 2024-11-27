import { itemsSection_4, wap } from "@/components/constants";
import useMatchMedia from "@/app/hooks/useMatchMedia";
import Link from "next/link";
import { FancyButton } from "@/components/magic-ui/FancyButton";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";

export const Section_4 = ({ className }: { className?: string }) => {
  const mobile = useMatchMedia("(max-width: 700px)", false);

  function soundClick() {
    const audio = new Audio("/effects-sounds/lighter-zippo-click.mp3");
    audio.volume = 0.3;
    return audio.play();
  }

  function soundClick2() {
    const audio = new Audio("/effects-sounds/button-click.mp3");
    audio.volume = 0.1;
    if (audio) {
      return audio.play();
    }
  }

  return (
    <section
      className={`border border-foreground/5 bg-zinc-900/50 p-6 rounded-xl relative ${className}`}
    >
      <header className="flex gap-4">
        <Image
          src="/avatar-mgc.PNG"
          width={100}
          height={100}
          alt="Avatar Gabriel 🎃"
          className="rounded-lg bg-violet-400/60 aspect-square"
        />
        <aside className="flex-col ml-1">
          {mobile ? (
            <p className="text-sm text-zinc-400 bg-zinc-900 items-center pl-[26px] pr-3 py-1 rounded-full border border-foreground/5 w-fit relative">
              <span className="avaliable-dot before:animate-ping" />
              Disponible
            </p>
          ) : (
            <p className="text-sm text-zinc-400 bg-zinc-900 items-center pl-[26px] pr-3 py-1 rounded-full border border-foreground/5 w-fit relative line-clamp-1">
              <span className="avaliable-dot before:animate-ping" />
              Disponible para Trabajar
            </p>
          )}
          <h3 className="text-white text-lg font-bold">Calcagni Gabriel</h3>
          <p className="text-zinc-400 text-sm">Desarrollador Front End</p>
        </aside>
        <Link
          href="/MGC-Currículum-11-2024.pdf"
          download="/MGC-Currículum-11-2024.pdf"
          title="Descargar CV"
          target="_blank"
          className="absolute group right-6 top-6 px-2 py-2 bg-[#131315] hover:bg-btn-background-hover rounded-md hover:shadow-md"
          onMouseDown={soundClick}
        >
          <span
            className={`pdf absolute -top-2 -right-4 text-[0.6rem] font-semibold px-1 rounded-full opacity-0 
           bg-gradient-to-b from-red-300 via-red-500 to-red-600 group-hover:opacity-100 transition-opacity duration-300 shadow-md shadow-black`}
          >
            PDF
          </span>
          <DownloadIcon className="w-4 h-4" />
        </Link>
      </header>
      <aside className="text-zinc-400 bg-zinc-900/30 flex flex-wrap items-center p-4 rounded-xl border border-foreground/5 mt-4">
        {itemsSection_4.map((item, index) => (
          <header key={index} className="flex text-left items-center mb-1 mr-2">
            <p className="flex items-center text-xs pr-2 pl-1 py-[2px] bg-zinc-800/50 border border-foreground/5 shadow-md rounded-full">
              {item.icon}
              {item.name}
            </p>
          </header>
        ))}
      </aside>

      <footer className="flex my-4 gap-2 justify-between">
        <FancyButton
          className={`py-3 px-3 flex items-center justify-center w-[100%] text-center ${
            mobile ? "text-xs" : "text-base"
          }`}
          duration={2.5}
          radius={10}
          onMouseEnter={soundClick2}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#A78BFA"
            className={`${
              mobile ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
            } z-20 inline -translate-y-[2px]`}
          >
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
          </svg>
          <a href="mailto:calcagni.gabriel86@gmail.com" target="_blank">
            Email
          </a>
        </FancyButton>
        <FancyButton
          className={`py-3 px-3 inline-flex items-center justify-center w-[100%] text-center ${
            mobile ? "text-xs" : "text-base"
          }`}
          duration={2.5}
          onMouseEnter={soundClick2}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            fill="#A78BFA"
            className={`${
              mobile ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
            } z-20 inline -translate-y-[2px]`}
          >
            <path
              fill="#A78BFA"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
            />
          </svg>
          <a
            href={`https://wa.me/${wap.number}?text=${wap.message}`}
            target="_blank"
          >
            WhatsApp
          </a>
        </FancyButton>
      </footer>
    </section>
  );
};
