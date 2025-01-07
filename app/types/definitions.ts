import { CSSProperties, ReactNode, ComponentProps } from 'react';

type FancyButton = ComponentProps<'button'>;
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

export interface FancyButtonProps extends FancyButton {
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
  id: string | number;
  data: any | Promise<void>;
  className: string;
};

export type Setcion_4Props = {
  city: string | Promise<void>;
  country: string | Promise<void>;
  province: string;
  flag: string | Promise<void>;
  className: string;
  userId: string | number | any;
};

export type Section_5Props = {
  city: string | Promise<void>;
  country: string | Promise<void>;
  className: string;
  createdAt: string | number | Date;
};

/**
 * Reviews Component Props
 */

export type ReviewsMarqueeProps = {
  data?: string | Promise<void>;
  id: string | number;
  avatarUrl: string;
  fullName: string;
  city: string;
  province: string;
  country?: string;
  flag?: string;
  createdAt: string | number | Date;
  comment: string;
  content?: string;
  trash?: boolean;
  edited?: boolean;
  editable?: boolean;
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onSave?: (id: string | number, comment: string, edited: boolean) => void;
};

/**
 * Reviews Client Component Props
 */

export type ReviewsClientProps = {
  data: any | Promise<any>;
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  editable?: boolean;
  edited?: boolean;
  onSave?: (id: string | number, comment: string, edited: boolean) => void;
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

/**
 * Edit Button Props
 */
export type EditButtonProps = {
  className?: string;
  onEdit: () => void;
};

/////////////////////
/// Fetch Props
////////////////

interface FetchProps {
  user: string;
  page: number | string;
  type: string;
  repo: string;
}

export type Section_3PropsOptional = Partial<Section_3Props>;
export type Setcion_4PropsOptional = Partial<Setcion_4Props>;
export type Section_5PropsOptional = Partial<Section_5Props>;
export type FecthPropsPartial = Partial<FetchProps>;
