import { useEffect, useRef, EffectCallback } from 'react';

export const useDidUpdate = (effect: EffectCallback) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      effect();
    }
  }, [effect]);
};
