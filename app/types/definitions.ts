import { CSSProperties, ReactNode } from "react";
/**
 * AuthButton Props
 */

export type AuthButtonProps = {
  user: string | any;
  signOut: () => Promise<void>;
};

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
  fancyColor?: string | number | CSSProperties;
  [key: string]: unknown;
}

/**
 * Main Section Props
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

export type Section_5Props = {
  city?: string | Promise<void>;
  country?: string | Promise<void>;
  className?: string;
  createdAt?: string | number | Date;
};

/**
 * Reviews Component Props
 */

export type ReviewsMarqueeProps = {
  data?: string | Promise<void>;
  id: string | number;
  avatarUrl: string;
  fullName: string;
  city: string | any;
  country: string | any;
  createdAt: string | number | Date;
  comment: string | [];
  trash?: boolean;
  onDelete?: (id: string | number) => void;
};

/**
 * Reviews Client Component Props
 */

export type ReviewsClientProps = {
  data: any | Promise<any>;
  onDelete?: (id: string | number) => void;
};

/**
 * Form Client Props
 */

export type ClientFormProps = {
  userName: string;
  fullName: string;
  avatar: string;
  onRefresh: () => Promise<any>;
};

/**
 * Delete Button Props
 */

export type DeleteButtonProps = {
  id: string | number;
  onDelete: () => void;
};
