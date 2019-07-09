import React from 'react';

import { defaultTheme } from '../../../theme';
import { CheckIcon } from '../../Icons';

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

        {this.props['aria-selected'] && <CheckIcon color={defaultTheme.colors.primary} size={'small'} />}
      </StyledListItem>
    );
  }
}
