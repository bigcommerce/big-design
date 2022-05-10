import React, { memo } from 'react';

import { HR } from '../../Typography';

import { StyledListItem } from './styled';

export const ListGroupSeparator: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = memo(() => (
  <StyledListItem aria-hidden={true} onMouseDown={preventFocus} tabIndex={-1}>
    {/* eslint-disable-next-line react/jsx-pascal-case */}
    <HR marginVertical="xSmall" />
  </StyledListItem>
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupSeparator.displayName = 'ListGroupSeparator';
