import { FancyButtonProps } from '@/app/types/definitions';
import { CSSProperties } from 'react';

export const FancyButton = ({
  children,
  className,
  style,
  duration,
  radius = 10,
  inset = 1,
  fancyColor = '#757575',
  ...props
}: FancyButtonProps) => {
  return (
    <button
      className={`fancy-button ${className}`}
      style={
        {
          ...style,
          '--animation-duration': `${duration}s`,
          '--radius': `${radius}px`,
          '--inset': `${inset}px`,
          '--fancy-color': `${fancyColor}`,
        } as CSSProperties
      }
      {...props}
    >
      <div className="fancy"></div>
      <span className="mx-2 z-20">{children}</span>
    </button>
  );
};
