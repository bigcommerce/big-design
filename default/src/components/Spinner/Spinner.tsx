import React from 'react';

import { ThemeInterface } from '../../theme';
import { IconProps } from '../Icons/Icon';

import { StyledSpinner, StyledSpinnerWrapper } from './styled';

export interface SpinnerProps {
  overlay: boolean;
  size: IconProps['size'];
  theme?: ThemeInterface;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
  static defaultProps: Partial<SpinnerProps> = {
    overlay: true,
    size: 'large',
  };

  render() {
    const { overlay, size, theme } = this.props;

    return (
      <StyledSpinnerWrapper theme={theme} overlay={overlay}>
        <StyledSpinner theme={theme} size={size} />
      </StyledSpinnerWrapper>
    );
  }
}

export interface SpinnerWrapperProps {
  overlay: boolean;
}
