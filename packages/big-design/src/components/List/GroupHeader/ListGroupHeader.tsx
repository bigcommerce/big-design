import React, { ComponentPropsWithoutRef, memo } from 'react';

import { StyledGroupHeader } from './styled';

export const ListGroupHeader: React.FC<ComponentPropsWithoutRef<'li'>> = memo(
  ({ className, style, value, ...rest }) => (
    <StyledGroupHeader {...rest} aria-hidden={true} onMouseDown={preventFocus} tabIndex={-1} />
  ),
);

function preventFocus(event: React.MouseEvent<HTMLLIElement>) {
  event.preventDefault();
}

ListGroupHeader.displayName = 'ListGroupHeader';
