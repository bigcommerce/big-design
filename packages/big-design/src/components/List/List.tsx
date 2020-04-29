import type { State } from '@popperjs/core';
import React, { forwardRef, HTMLAttributes, memo, Ref } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';

import { StyledList } from './styled';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  maxHeight: number;
  update(): Promise<Partial<State> | null>;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

const StyleableList: React.FC<ListProps & PrivateProps> = ({ forwardedRef, update, ...props }) => {
  const { height, width } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    async function scheduleUpdate() {
      await update();
    }

    scheduleUpdate();
  }, [props.children, height, width]);

  return <StyledList ref={forwardedRef} {...props} />;
};

export const List = memo(
  forwardRef<HTMLUListElement, ListProps>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);
