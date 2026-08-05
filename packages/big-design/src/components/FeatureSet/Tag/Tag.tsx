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
      <StyleableSmall $ellipsis $margin="none" as="span" color="currentColor" id={id}>
        {label}
      </StyleableSmall>
    </StyledLi>
  ) : null;
});

Tag.displayName = 'Tag';
