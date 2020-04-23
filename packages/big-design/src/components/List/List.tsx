import React, { forwardRef, HTMLAttributes, memo, Ref } from 'react';

import { useIsomorphicLayoutEffect, useWindowSize } from '../../hooks';

import { StyledList } from './styled';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  isOpen: boolean;
  maxHeight: number;
  update(): void;
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
  }, [props.children, props.isOpen, height, width]);

  return <StyledList ref={forwardedRef} {...props} />;
};

export const List = memo(
  forwardRef<HTMLUListElement, ListProps>((props, ref) => <StyleableList {...props} forwardedRef={ref} />),
);
