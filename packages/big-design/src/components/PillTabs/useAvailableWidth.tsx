import { useCallback, useEffect, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';

interface Refs {
  parent: React.RefObject<HTMLElement>;
  dropdown: React.RefObject<HTMLElement>;
}

export const useAvailableWidth = ({ parent, dropdown }: Refs) => {
  const [value, setValue] = useState<number>(Infinity);
  const update = useCallback(() => {
    const parentWidth = parent.current?.offsetWidth;
    const dropdownWidth = dropdown.current?.offsetWidth;

    if (!parentWidth || !dropdownWidth) {
      return;
    }

    setValue(parentWidth - dropdownWidth);
  }, [parent, dropdown]);

  useEffect(update, [update]);

  useWindowResizeListener(update);

  return value;
};
