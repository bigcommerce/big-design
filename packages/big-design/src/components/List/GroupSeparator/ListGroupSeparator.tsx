'use client';

import React, { memo } from 'react';

import { HR } from '../../Typography';

import { StyledListItem } from './styled';

export const ListGroupSeparator: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = memo(() => (
  <StyledListItem aria-hidden={true} onMouseDown={preventFocus} tabIndex={-1}>
    <HR marginVertical="xSmall" />
  </StyledListItem>
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupSeparator.displayName = 'ListGroupSeparator';
