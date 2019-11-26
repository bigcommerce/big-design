import React, { memo } from 'react';

import { StyledGroupHeader } from './styled';

export const ListGroupHeader: React.FC<React.LiHTMLAttributes<
  HTMLLIElement
>> = memo(({ className, style, value, ...rest }) => (
  <StyledGroupHeader {...rest} tabIndex={-1} onMouseDown={preventFocus} />
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupHeader.displayName = 'ListGroupHeader';
