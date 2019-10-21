import { CheckIcon } from '@bigcommerce/big-design-icons';
import React, { memo, Ref } from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  disabled?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem: React.FC<ListItemProps & PrivateProps> = memo(
  ({ actionType = 'normal' as 'normal', children, className, forwardedRef, style, value, ...rest }) => (
    <StyledListItem
      {...rest}
      actionType={actionType}
      ref={forwardedRef}
      tabIndex={-1}
      data-value={value}
      onMouseDown={preventFocus}
    >
      {children}

      {rest['aria-selected'] && <CheckIcon color="primary" size="large" />}
    </StyledListItem>
  ),
);

function preventFocus(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  event.preventDefault();
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => (
  <StyleableListItem {...props} forwardedRef={ref} />
));
