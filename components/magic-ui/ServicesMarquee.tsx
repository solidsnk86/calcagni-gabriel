import { CodeSquare, Smartphone, SwatchBook } from "lucide-react";
import { Marquee } from "./Marquee";
import { ReactNode } from "react";

const services = [
  {
    name: "Desarrollo Web",
    icon: <CodeSquare className="w-5 h-5" />,
  },
  {
    name: "Diseño Web",
    icon: <SwatchBook className="w-5 h-5" />,
  },
  {
    name: "Diseño Aplicación Móvil",
    icon: <Smartphone className="w-5 h-5" />,
  },
];

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
      <Marquee reverse className="[--duration:20s]" animateX flex>
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
      <Marquee className="[--duration:20s]" animateX flex>
        {services.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </Marquee>
    </div>
  );
};
