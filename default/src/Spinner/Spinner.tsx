import React from 'react';
import styled from 'styled-components';

import { defaultTheme, ThemeInterface } from '../themes/basic';
import { addValues } from '../themes/basic/helpers/addition';
import LoadingIcon from '../Icons/LoadingIcon';

import { SpinnerStyles, SpinnerWrapperStyles } from './styles';

export interface SpinnerProps {
  overlay: boolean;
  size: 'small' | 'medium' | 'large';
  theme: ThemeInterface;
}

export class Spinner extends React.PureComponent<SpinnerProps> {
  static defaultProps: Partial<SpinnerProps> = {
    overlay: true,
    size: 'small',
    theme: defaultTheme,
  };

  render() {
    const { overlay, size, theme } = this.props;
    const sizeMap = this.getSizeMap();
    const mappedSize = sizeMap[size];

    return (
      <SpinnerWrapper theme={theme} overlay={overlay}>
        <StyledSpinner theme={theme} width={mappedSize} height={mappedSize} />
      </SpinnerWrapper>
    );
  }

  private getSizeMap() {
    const { spacing } = this.props.theme;

    return {
      small: spacing.medium,
      medium: spacing.xxLarge,
      large: addValues(spacing.xxLarge, spacing.xxLarge),
    };
  }
}

export interface SpinnerWrapperProps {
  overlay: boolean;
}

const SpinnerWrapper = styled.div<SpinnerWrapperProps>`
  ${({ theme }) => theme.Spinner || SpinnerWrapperStyles}
`;

const StyledSpinner = styled(LoadingIcon)`
  ${({ theme }) => theme.SpinnerWrapper || SpinnerStyles}
`;
