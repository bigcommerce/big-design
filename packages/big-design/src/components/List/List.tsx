import React, { forwardRef, memo, Ref } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';

import { StyledList } from './styled';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  isOpen: boolean;
  maxHeight: number;
  scheduleUpdate(): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLUListElement>;
}

const StyleableList: React.FC<ListProps & PrivateProps> = ({ forwardedRef, scheduleUpdate, ...props }) => {
  const { height, width } = useWindowSize();

  useIsomorphicLayoutEffect(scheduleUpdate, [props.children, props.isOpen, height, width]);

  return <StyledList ref={forwardedRef} {...props} />;
};

export const List = memo(
  forwardRef<HTMLUListElement, ListProps>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);
