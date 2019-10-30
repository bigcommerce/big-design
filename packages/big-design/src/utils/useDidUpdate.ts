import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      effect();
    }
  }, deps);
};
