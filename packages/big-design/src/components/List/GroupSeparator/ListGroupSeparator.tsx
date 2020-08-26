import React, { memo } from 'react';

import { HR } from '../../Typography';

export const ListGroupSeparator: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = memo(() => (
  <li tabIndex={-1} onMouseDown={preventFocus} aria-hidden={true}>
    <HR />
  </li>
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

ListGroupSeparator.displayName = 'ListGroupSeparator';
