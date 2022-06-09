import React, { memo } from 'react';

import { StyledGroupHeader } from './styled';

export const ListGroupHeader: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = memo(
  ({ className, style, value, ...rest }) => (
    <StyledGroupHeader {...rest} aria-hidden={true} onMouseDown={preventFocus} tabIndex={-1} />
  ),
);

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupHeader.displayName = 'ListGroupHeader';
