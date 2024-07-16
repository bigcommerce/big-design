import React, { ComponentPropsWithoutRef, memo } from 'react';

import { HR } from '../../Typography';

import { StyledListItem } from './styled';

export const ListGroupSeparator: React.FC<ComponentPropsWithoutRef<'li'>> = memo(() => (
  <StyledListItem aria-hidden={true} onMouseDown={preventFocus} tabIndex={-1}>
    <HR marginVertical="xSmall" />
  </StyledListItem>
));

function preventFocus(event: React.MouseEvent<HTMLLIElement>) {
  event.preventDefault();
}

ListGroupSeparator.displayName = 'ListGroupSeparator';
