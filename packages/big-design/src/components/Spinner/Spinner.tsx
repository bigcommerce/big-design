import { IconProps } from '@bigcommerce/big-design-icons';
import { ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';

import { StyledSpinner, StyledSpinnerWrapper } from './styled';

export interface SpinnerProps {
  overlay: boolean;
  size: IconProps['size'];
  theme?: ThemeInterface;
  title?: string;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
  static defaultProps: Partial<SpinnerProps> = {
    overlay: true,
    size: 'large',
    title: 'loading',
  };

  render() {
    const { overlay, size, theme, title } = this.props;

    return (
      <StyledSpinnerWrapper theme={theme} overlay={overlay}>
        <StyledSpinner theme={theme} size={size} title={title} />
      </StyledSpinnerWrapper>
    );
  }
}

export interface SpinnerWrapperProps {
  overlay: boolean;
}
