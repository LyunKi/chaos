import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [_, setFlag] = useState({});
  return useCallback(() => {
    setFlag({});
  }, []);
}
