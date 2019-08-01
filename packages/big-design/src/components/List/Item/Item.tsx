import { CheckIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { StyledListItem } from './styled';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
}

export class ListItem extends React.PureComponent<ListItemProps> {
  render() {
    const { children, value, ...rest } = this.props;

    return (
      <StyledListItem value={value} tabIndex={-1} {...rest}>
        {children}

        {this.props['aria-selected'] && <CheckIcon color="primary" size={'small'} />}
      </StyledListItem>
    );
  }
}
