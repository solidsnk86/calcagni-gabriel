import React, { Children, cloneElement } from "react";
import { cn } from "@/utils/cn";
import { MarqueeProps } from "@/app/types/types";

export const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  slice,
  animateX,
  animateY,
  flex,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("[--duration:40s] [--gap:1rem] transition-all", className)}
    >
      <article
        className={cn("w-max items-stretch gap-[--gap]", {
          flex: flex,
          "[animation-direction:reverse]": reverse,
          "hover:[animation-play-state:paused]": pauseOnHover,
          "animate-marqueeX": animateX,
          "animate-marqueeY": animateY,
        })}
      >
        {Children.map(children, (child) => cloneElement(child as any))}
        {Children.map(children, (child) => cloneElement(child as any))}
      </article>
    </div>
  );
};
