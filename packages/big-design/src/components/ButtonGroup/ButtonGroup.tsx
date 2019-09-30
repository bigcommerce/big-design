import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown';
import { FlexProps } from '../Flex';

import { StyledButtonGroup } from './styled';

export interface ButtonGroupProps extends FlexProps {
  theme?: ThemeInterface;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className, style, ...props }) => {
  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === Button || child.type === Dropdown) {
          return child;
        }
      }
    });
  };

  return <StyledButtonGroup {...props}>{renderChildren()}</StyledButtonGroup>;
};

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.defaultProps = { flexDirection: 'row' };
