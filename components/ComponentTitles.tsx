import { ComponentProps } from "react";

type TitleProps = ComponentProps<"h2">;

export class TitleComponent {
  public static H1({ children, className }: TitleProps) {
    return (
      <h1 className={`text-4xl text-foreground font-extrabold ${className}`}>
        {children}
      </h1>
    );
  }

  public static H2({ children, className }: TitleProps) {
    return (
      <h2 className={`text-3xl text-foreground font-bold ${className}`}>
        {children}
      </h2>
    );
  }

  public static H3({ children, className }: TitleProps) {
    return (
      <h3 className={`text-2xl text-foreground font-semibold ${className}`}>
        {children}
      </h3>
    );
  }

  public static H4({ children, className }: TitleProps) {
    return (
      <h3 className={`text-xl text-foreground font-normal ${className}`}>
        {children}
      </h3>
    );
  }
}
