import React, { memo, Ref } from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  disabled?: boolean;
  isAction?: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem: React.FC<ListItemProps & PrivateProps> = ({
  actionType = 'normal' as 'normal',
  forwardedRef,
  isAction = false,
  ...props
}) => {
  return <StyledListItem {...props} actionType={actionType} isAction={isAction} ref={forwardedRef} />;
};

export const ListItem = memo(
  React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => <StyleableListItem {...props} forwardedRef={ref} />),
);
