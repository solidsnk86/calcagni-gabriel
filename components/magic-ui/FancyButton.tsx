import React, { CSSProperties, ReactNode } from "react";

interface FancyButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: string | number;
  radius?: string | number;
  inset?: string | number;
  [key: string]: unknown;
}

export const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  className,
  style,
  duration,
  radius = 10,
  inset = 1,
  ...props
}) => {
  return (
    <button
      className={`fancy-button ${className}`}
      style={
        {
          ...style,
          "--animation-duration": `${duration}s`,
          "--radius": `${radius}px`,
          "--inset": `${inset}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="fancy"></div>
      <span className="mx-2 z-20">{children}</span>
    </button>
  );
};
