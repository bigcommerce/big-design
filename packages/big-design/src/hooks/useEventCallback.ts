import { useCallback, useEffect, useRef } from 'react';

type Callback<T> = (...args: T[]) => void;

export function useEventCallback<T>(fn: Callback<T>) {
  const ref = useRef<Callback<T>>(fn);

  // TODO: Change to useIsomorphicLayoutEffect
  useEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: T[]) => {
    const fun = ref.current;

    return fun(...args);
  }, []);
}
