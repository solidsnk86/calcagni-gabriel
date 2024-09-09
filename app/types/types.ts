import { CSSProperties, ReactNode } from "react";

/**
 * UI Elements Interface
 */

export interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  [key: string]: unknown;
  slice?: boolean;
  animateX?: boolean;
  animateY?: boolean;
  flex?: boolean;
}

export interface FancyButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  duration?: string | number;
  radius?: string | number;
  inset?: string | number;
  [key: string]: unknown;
}

/**
 * Main Section Types
 */

export type Section_3Props = {
  id?: string | number;
  data: any | Promise<void>;
  className?: string;
};

export type Setcion_4Props = {
  city?: string | Promise<void>;
  country?: string | Promise<void>;
  flag?: string | Promise<void>;
  longitude?: string | number | Promise<void>;
  latitude?: string | number | Promise<void>;
  className?: string;
};

/**
 * Reviews Component Types
 */

export type ReviewsMarqueeTypes = {
  data?: string | Promise<void>;
  id: string | number;
  avatarUrl: string;
  fullName: string;
  city: string | any;
  country: string | any;
  createdAt: string | number | Date;
  comment: string;
  trash?: boolean;
  onDelete?: (id: string | number) => void;
};

/**
 * Reviews Client Component
 */

export type ReviewsClientTypes = {
  data: any | Promise<any>;
  onDelete?: (id: string | number) => void;
};

/**
 * Form Client Types
 */

export type ClientFormTypes = {
  userName: string;
  fullName: string;
  avatar: string;
  onRefresh?: () => Promise<any>;
};
