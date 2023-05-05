import { ORIGIN_TARGET } from './constants';

export function unwrap(observable: any) {
  return observable[ORIGIN_TARGET];
}
