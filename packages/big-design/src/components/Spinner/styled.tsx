import { AddIcon } from '@bigcommerce/big-design-icons';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { SpinnerWrapperProps } from './Spinner';

export const StyledSpinnerWrapper = styled.div<SpinnerWrapperProps>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  transition: all 250ms ease-in-out;
  width: 100%;

  ${({ overlay }) =>
    overlay &&
    css`
      background-color: rgba(255, 255, 255, 0.9);
    `};
`;

export const StyledSpinner = styled(AddIcon)`
  animation: ${({ theme }) =>
    css`
      ${theme.keyframes.rotate} 1s linear infinite
    `};
  position: absolute;
`;

StyledSpinnerWrapper.defaultProps = { theme: defaultTheme };
StyledSpinner.defaultProps = { theme: defaultTheme };
