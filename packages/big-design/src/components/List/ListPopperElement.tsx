import React, { memo } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks/';

interface ListPopperElementProps {
  isOpen: boolean;
  scheduleUpdate(): void;
}

export const ListPopperElement: React.FC<ListPopperElementProps> = memo(({ children, isOpen, scheduleUpdate }) => {
  const { height, width } = useWindowSize();

  useIsomorphicLayoutEffect(scheduleUpdate, [children, isOpen, height, width]);

  return <>{children}</>;
});
