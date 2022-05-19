import { IconType } from "react-icons";

export interface NavigationLayerLink {
  readonly title: string;
  readonly icon: IconType;
  readonly path: string;
  readonly exact?: boolean;
}

export interface NavigationLayerItem {
  readonly title: string;
  readonly icon: IconType;
  readonly items: NavigationLayerChildItem[];
  readonly path?: never;
  readonly exact?: never;
}

export interface NavigationLayerChildItem {
  readonly title: string;
  readonly path: string;
  readonly exact?: boolean;
}

export interface NavigationLayer {
  readonly title: string;
  readonly items: ReadonlyArray<NavigationLayerLink | NavigationLayerItem>;
}

export declare type Routing = ((...args: any) => Routing) | string | {
  [key: string]: Routing;
};
