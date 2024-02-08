import { KV } from '@cloud-dragon/common-types';
import { View } from './View';
import { isEmpty } from 'lodash';

export interface Route {
  route: string;
  view: View;
  children: Route[];
}

export interface Navigation {
  routes: Route[];
  type: string;
}

export interface Navigator {
  navigate(route: string): any;
}

export function isNavigation(scheme: KV<any>): scheme is Navigation {
  return !isEmpty(scheme.groups);
}
