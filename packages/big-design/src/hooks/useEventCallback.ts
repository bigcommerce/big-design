import { useCallback, useEffect, useRef } from 'react';

type Callback<T extends unknown[]> = (...args: T) => void;

export function useEventCallback<T extends unknown[]>(fn: Callback<T>) {
  const ref = useRef<Callback<T>>(fn);

  // TODO: Change to useIsomorphicLayoutEffect
  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: T) => {
    const fun = ref.current;

    return fun(...args);
  }, []);
}
