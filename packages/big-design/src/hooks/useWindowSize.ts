import { useEffect } from 'react';

import { isClient } from '../utils';

import { useRafState } from './useRafState';

interface State {
  height: number;
  width: number;
}

export const useWindowSize = () => {
  const [state, setState] = useRafState<State>({
    height: isClient ? window.innerHeight : -1,
    width: isClient ? window.innerWidth : -1,
  });

  if (!isClient) {
    return state;
  }

  useEffect(() => {
    const resizeHandler = () => {
      setState({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return state;
};
