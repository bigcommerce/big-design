import { useCallback, useEffect, useRef } from 'react';

type Callback<T> = (...args: T[]) => void;

export function useEventCallback<T>(fn: Callback<T>, dependencies: any[]) {
  const ref = useRef<Callback<T>>(() => {
    // no-op default
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (...args: T[]) => {
      const fun = ref.current;

      return fun(...args);
    },
    [ref],
  );
}
