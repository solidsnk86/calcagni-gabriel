import { ComponentProps } from "react";

type TitleProps = ComponentProps<"h2">;

export class ComponentTitle {
  public static H1({ children, className, style }: TitleProps) {
    return (
      <h1
        className={`text-4xl text-foreground font-extrabold ${className}`}
        style={style}
      >
        {children}
      </h1>
    );
  }

  public static H2({ children, className, style }: TitleProps) {
    return (
      <h2
        className={`text-3xl text-foreground font-bold ${className}`}
        style={style}
      >
        {children}
      </h2>
    );
  }

  public static H3({ children, className, style }: TitleProps) {
    return (
      <h3
        className={`text-2xl text-foreground font-semibold ${className}`}
        style={style}
      >
        {children}
      </h3>
    );
  }

  public static H4({ children, className, style }: TitleProps) {
    return (
      <h3
        className={`text-xl text-foreground font-normal ${className}`}
        style={style}
      >
        {children}
      </h3>
    );
  }
}
