import { ReactChildren, ReactChild } from 'react';
export interface ImagePropsInterface {
  alt: string;
  className?: string;
  src: any;
  style?: any;
  height?: string;
  width?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface LinkPropsInterface {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  href: string;
  rel?: string;
  className?: string;
  id?: string;
  type?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface NavListInterface {
  className?: string;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  onClick?: React.MouseEventHandler<HTMLUListElement>;
}

export interface NavListItemInterface {
  className?: string;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

export interface SectionInterface {
  className?: string;
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
