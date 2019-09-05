import { CheckIcon } from '@bigcommerce/big-design-icons';
import React, { memo, Ref } from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListItem: React.FunctionComponent<ListItemProps & PrivateProps> = memo(
  ({ children, forwardedRef, value, ...rest }) => {
    return (
      <StyledListItem ref={forwardedRef} tabIndex={-1} data-value={value} {...rest}>
        {children}

        {rest['aria-selected'] && <CheckIcon color="primary" size={'small'} />}
      </StyledListItem>
    );
  },
);

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => (
  <StyleableListItem {...props} forwardedRef={ref} />
));
