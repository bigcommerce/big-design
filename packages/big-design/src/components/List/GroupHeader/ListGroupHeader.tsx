import React, { memo, Ref } from 'react';

import { StyledGroupHeader } from './styled';

const StyleableGroupHeader: React.FC<React.LiHTMLAttributes<
  HTMLLIElement
>> = memo(({ className, style, value, ...rest }) => (
  <StyledGroupHeader {...rest} tabIndex={-1} onMouseDown={preventFocus} />
));

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}
