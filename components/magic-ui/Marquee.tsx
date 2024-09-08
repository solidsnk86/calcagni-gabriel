import React, { Children, cloneElement } from "react";
import { cn } from "@/utils/cn";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  [key: string]: unknown;
  slice?: boolean;
  animateX?: boolean;
  animateY?: boolean;
  flex?: boolean;
}

export const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  slice,
  animateX,
  animateY,
  flex,
  ...props
}: MarqueeProps) => {
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
