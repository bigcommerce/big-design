import { useEffect } from 'react';

export const useWindowResizeListener = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [callback]);
};
