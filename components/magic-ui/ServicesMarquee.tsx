import { Marquee } from "./Marquee";
import { ReactNode } from "react";
import { services } from "@/components/constants";

const ServiceCard = ({ name, icon }: { name: string; icon: ReactNode }) => {
  return (
    <div className="flex py-1 px-2 bg-zinc-900/50 text-white rounded-xl text-left border border-foreground/5 items-center font-medium">
      <span className="inline-flex p-2 border border-foreground/5 rounded-lg mr-2 bg-zinc-800/50 shadow-md">
        {icon}
      </span>
      {name}
    </div>
  );
};

export const ServicesMarquee = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2 mb-[27px]">
      <Marquee reverse className="[--duration:55s]" animateX flex>
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
      <Marquee className="[--duration:55s]" animateX flex>
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
    </div>
  );
};
