import { ObjectWithKey, ObjectKey } from '@cloud-dragon/common-types';
import { useCallback, useState } from 'react';

export interface UseSelectParams<
  T extends ObjectWithKey<Key>,
  Key extends ObjectKey = 'id'
> {
  options: T[];
  initialValue?: ObjectKey;
  onChange?: (value: ObjectKey, option: T, options: T[]) => any;
  keyProp?: Key;
}

export function useSelect<
  T extends ObjectWithKey<Key>,
  Key extends ObjectKey = 'id'
>(params: UseSelectParams<T, Key>) {
  const { initialValue, onChange, keyProp, options } = params;
  const [value, onValueChange] = useState(initialValue);
  const innerOnChange = useCallback(() => {}, []);
  return {
    value,
    onChange: innerOnChange,
  };
}
