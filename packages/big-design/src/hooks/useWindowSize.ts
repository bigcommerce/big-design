import { isClient } from '../utils';

import { useRafState } from './useRafState';
import { useWindowResizeListener } from './useWindowResizeListener';

interface State {
  height: number;
  width: number;
}

export const useWindowSize = () => {
  const [state, setState] = useRafState<State>({
    height: isClient ? window.innerHeight : -1,
    width: isClient ? window.innerWidth : -1,
  });
  const resizeHandler = () => {
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useWindowResizeListener(resizeHandler);

  if (!isClient) {
    return state;
  }

  return state;
};
