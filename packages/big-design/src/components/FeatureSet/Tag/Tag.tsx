import React, { memo, ReactNode, useId } from 'react';

import { StyleableSmall } from '../../Typography/private';

import { StyledLi } from './styled';

export interface TagProps {
  icon?: ReactNode;
  label: string;
}

export const Tag: React.FC<TagProps> = memo(({ icon, label }) => {
  const id = useId();

  return label ? (
    <StyledLi aria-labelledby={id}>
      {icon}
      <StyleableSmall as="span" color="currentColor" ellipsis id={id} margin="none">
        {label}
      </StyleableSmall>
    </StyledLi>
  ) : null;
});

Tag.displayName = 'Tag';
