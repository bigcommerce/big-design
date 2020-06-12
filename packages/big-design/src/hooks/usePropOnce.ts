import { useEffect, useRef } from 'react';

export const usePropOnce = <T>(prop: T) => {
  const initialProp = useRef(prop);

  useEffect(() => {
    if (initialProp.current === null || initialProp.current === undefined) {
      initialProp.current = prop;
    }
  }, [prop]);

  return initialProp.current;
};
