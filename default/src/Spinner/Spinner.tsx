import React from 'react';
import styled from 'styled-components';

import { createTheme, ThemeInterface } from '../themes/basic';
import { addValues } from '../themes/basic/helpers/addition';
import { SvgLoadingIcon } from '../Icons/LoadingIcon';

// We won't need this when we use ThemeProvider
// However since a couple of us will be playing with this repo
// We can avoid having colliding themes this way
const defaultTheme = createTheme();

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
        <StyledSpinner theme={theme} width={mappedSize} height="auto" />
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
  ${({ theme }) => theme.Spinner.SpinnerWrapper}
`;

const StyledSpinner = styled(SvgLoadingIcon)`
  ${({ theme }) => theme.Spinner.Spinner}
`;
