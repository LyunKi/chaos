import { ObjectWithKey, ObjectKey } from '@cloud-dragon/common-types';
import { useCallback, useState } from 'react';

export interface UseSelectParams<
  T extends ObjectWithKey<Key>,
  Key extends ObjectKey = 'id'
> {
  options: T[];
  initialValue?: ObjectKey;
  onChange?: (value: ObjectKey, option: T | undefined, options: T[]) => any;
  keyProp?: Key;
}

export function useSelect<
  T extends ObjectWithKey<Key>,
  Key extends ObjectKey = 'id'
>(params: UseSelectParams<T, Key>) {
  const { initialValue, onChange, keyProp = 'id' as Key, options } = params;
  const [value, onValueChange] = useState(initialValue);
  const innerOnChange = useCallback(
    (newValue: string) => {
      const option = options.find((item) => item[keyProp] === newValue);
      onChange?.(newValue, option, options);
      onValueChange(newValue);
    },
    [keyProp, onChange, options]
  );
  return {
    value,
    onChange: innerOnChange,
  };
}
