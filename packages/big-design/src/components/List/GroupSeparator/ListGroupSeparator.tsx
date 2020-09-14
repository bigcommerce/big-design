import React, { memo } from 'react';

import { HR } from '../../Typography';

import { StyledListItem } from './styled';

export const ListGroupSeparator: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = memo(() => (
  <StyledListItem tabIndex={-1} onMouseDown={preventFocus} aria-hidden={true}>
    <HR marginVertical="xSmall" />
  </StyledListItem>
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupSeparator.displayName = 'ListGroupSeparator';
