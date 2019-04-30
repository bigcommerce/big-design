import React from 'react';

import { defaultTheme } from '../../../theme';
import { CheckIcon } from '../../Icons';

import { StyledListItem } from './styled';

export class ListItem extends React.PureComponent<React.LiHTMLAttributes<HTMLLIElement>> {
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
