import { createRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';

export const useAvailableWidth = () => {
  const parentRef = createRef<HTMLDivElement>();
  const dropdownRef = createRef<HTMLDivElement>();

  const [value, setValue] = useState<number>(Infinity);
  const update = useCallback(() => {
    const parentWidth = parentRef.current?.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    setValue(parentWidth - dropdownWidth);
  }, [parentRef, dropdownRef]);

  useEffect(update, [update]);

  useWindowResizeListener(update);

  return useMemo(
    () => ({ refs: { parent: parentRef, dropdown: dropdownRef }, value }),
    [value, parentRef, dropdownRef],
  );
};
