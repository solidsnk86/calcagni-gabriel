import { FancyButtonProps } from "@/app/types/definitions";

export const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  className,
  style,
  duration,
  radius = 10,
  inset = 1,
  fancyColor = "#757575",
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
          "--fancy-color": `${fancyColor}`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="fancy"></div>
      <span className="mx-2 z-20">{children}</span>
    </button>
  );
};
