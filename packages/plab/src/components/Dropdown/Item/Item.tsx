import React from 'react';
import { AllHTMLAttributes } from 'react';

import { withDownshift } from '../Downshift/Downshift';

import { StyledDropdownItem } from './styled';

export interface DropdownItemProps {
  value?: AllHTMLAttributes<HTMLElement>['value'];
}

const Item = withDownshift('item', ({ downshift: { getItemProps }, children, value, ...rest }) => (
  <StyledDropdownItem {...getItemProps(rest)} value={value}>
    {children}
  </StyledDropdownItem>
));

export class DropdownItem extends React.PureComponent<DropdownItemProps> {
  render() {
    const { children, value, ...props } = this.props;

    return (
      <Item value={value} item={this} {...props}>
        {children}
      </Item>
    );
  }
}
