import React, { memo, Ref } from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  actionType?: 'normal' | 'destructive';
  disabled?: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem: React.FC<ListItemProps & PrivateProps> = ({
  actionType = 'normal' as 'normal',
  forwardedRef,
  ...props
}) => {
  return <StyledListItem {...props} actionType={actionType} ref={forwardedRef} />;
};

export const ListItem = memo(
  React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => <StyleableListItem {...props} forwardedRef={ref} />),
);
