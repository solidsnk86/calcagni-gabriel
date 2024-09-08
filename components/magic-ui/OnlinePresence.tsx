import { DiscordLogo } from "@/components/logo-icons/DiscordLogo";
import { InstagramLogo } from "@/components/logo-icons/InstagramLogo";
import { TwitterLogo } from "@/components/logo-icons/TwitterLogo";
import { YouTubeLogo } from "@/components/logo-icons/YouYubeLogo";
import { Marquee } from "./Marquee";

const logos = [
  {
    name: <TwitterLogo />,
  },
  {
    name: <YouTubeLogo />,
  },
  {
    name: <DiscordLogo />,
  },
  {
    name: <InstagramLogo />,
  },
];

const LogoCard = ({ name }: { name: SVGElement | any }) => {
  return (
    <article className="flex py-[3px] px-2 bg-zinc-900/50 text-white rounded-xl text-left border border-foreground/5 items-center">
      {name}
    </article>
  );
};

export const OnlinePresence = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2 mb-[27px]">
      <Marquee reverse className="[--duration:20s]" flex animateX>
        {logos.map((logo, index) => (
          <LogoCard key={index} {...logo} />
        ))}
      </Marquee>
      <Marquee className="[--duration:20s]" flex animateX>
        {logos.map((logo, index) => (
          <LogoCard key={index} {...logo} />
        ))}
      </Marquee>
    </div>
  );
};
