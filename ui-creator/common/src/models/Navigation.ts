import { KV } from '@cloud-dragon/common-types';
import { View } from './View';
import { isEmpty } from 'lodash';

export type RouteItem = {
  name: string;
  route?: string;
  child: View | Navigation;
};

export interface RouteGroup {
  name: string;
  items: RouteItem[];
}

export interface Navigation {
  groups: RouteGroup[];
  type: string;
  initialRouteName?: string;
}

export interface Navigator {
  navigate(route: string): any;
}

export function isNavigation(scheme: KV<any>): scheme is Navigation {
  return !isEmpty(scheme.groups);
}
