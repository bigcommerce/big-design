import React from 'react';
import styled from 'styled-components';

import { defaultTheme, ThemeInterface } from '../../theme';
import { IconProps } from '../Icons/Icon';
import LoadingIcon from '../Icons/LoadingIcon';

import { SpinnerStyles, SpinnerWrapperStyles } from './styles';

export interface SpinnerProps {
  overlay: boolean;
  size: IconProps['size'];
  theme?: ThemeInterface;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
  static defaultProps: Partial<SpinnerProps> = {
    overlay: true,
    size: 'small',
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

const StyledSpinnerWrapper = styled.div<SpinnerWrapperProps>`
  ${({ theme }) => theme.Spinner || SpinnerWrapperStyles}
`;

const StyledSpinner = styled(LoadingIcon)`
  ${({ theme }) => theme.SpinnerWrapper || SpinnerStyles}
`;

StyledSpinnerWrapper.defaultProps = { theme: defaultTheme };
StyledSpinner.defaultProps = { theme: defaultTheme };
