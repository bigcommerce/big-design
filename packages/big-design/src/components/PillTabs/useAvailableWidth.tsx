import { useCallback, useEffect, useState } from 'react';

import { useWindowResizeListener } from '../../hooks';

interface Refs {
  parent: React.RefObject<HTMLElement>;
  dropdown: React.RefObject<HTMLElement>;
}

export const useAvailableWidth = ({ parent, dropdown }: Refs) => {
  const [value, setValue] = useState<number>(0);
  const update = useCallback(() => {
    const parentWidth = parent.current?.offsetWidth;
    const dropdownWidth = dropdown.current?.offsetWidth;

    // Check for undefined/null (refs not attached) rather than falsy (0 is valid)
    if (parentWidth == null || dropdownWidth == null) {
      return;
    }

    setValue(parentWidth - dropdownWidth);
  }, [parent, dropdown]);

  useEffect(update, [update]);

  useWindowResizeListener(update);

  return value;
};
