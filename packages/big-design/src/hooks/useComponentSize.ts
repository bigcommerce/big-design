import { RefObject, useCallback, useEffect } from 'react';

import { useRafState } from './useRafState';

interface ComponentSize {
  height: HTMLElement['offsetHeight'];
  width: HTMLElement['offsetWidth'];
}

const getSize = <T extends HTMLElement>(element: RefObject<T>['current']): ComponentSize => ({
  height: element ? element.offsetHeight : 0,
  width: element ? element.offsetWidth : 0,
});

export const useComponentSize = <T extends HTMLElement>(ref: RefObject<T>): ComponentSize => {
  const [size, setSize] = useRafState(getSize(ref.current));

  const handleResize = useCallback<() => void | MutationCallback>(() => {
    if (ref.current) {
      setSize(getSize(ref.current));
    }
  }, [ref, setSize]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(handleResize);

      observer.observe(ref.current, { childList: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [ref, handleResize]);

  return size;
};
