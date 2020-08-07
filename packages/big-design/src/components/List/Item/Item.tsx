import React, { forwardRef, LiHTMLAttributes, memo, Ref } from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  autoWidth?: boolean;
  disabled?: boolean;
  isAction?: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem: React.FC<ListItemProps & PrivateProps> = ({
  autoWidth = false,
  actionType = 'normal' as 'normal',
  forwardedRef,
  isAction = false,
  ...props
}) => {
  return (
    <StyledListItem {...props} autoWidth={autoWidth} actionType={actionType} isAction={isAction} ref={forwardedRef} />
  );
};

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps>((props, ref) => <StyleableListItem {...props} forwardedRef={ref} />),
);
