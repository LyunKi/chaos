import { MutableRefObject, RefCallback } from 'react';

export type SupportedRef<T> = RefCallback<T> | MutableRefObject<T>;

function attachRef<T>(ref: SupportedRef<T>, node: T) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object') {
    ref.current = node;
  }
}

export function combineRefs<T>(
  ...refs: (SupportedRef<T> | null | undefined)[]
) {
  return function binder(node: T) {
    refs.filter((ref) => !!ref).forEach((ref) => attachRef(ref!, node));
  };
}
