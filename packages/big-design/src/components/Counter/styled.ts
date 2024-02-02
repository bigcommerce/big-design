import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { StyleableButton } from '../Button/private';
import { StyledInput, StyledInputWrapper, StyledInputWrapperProps } from '../Input/private';

export const StyledCounterButton = styled(StyleableButton)`
  background-color: inherit;
  border: none;
  color: ${({ theme }) => theme.colors.secondary60};
  width: auto;
  height: auto;
  padding: 0;

  &[disabled],
  &:active,
  &:hover:not(:active) {
    background-color: inherit;
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const StyledCounterWrapper = styled(StyledInputWrapper)<StyledInputWrapperProps>`
  padding: 0 ${({ theme }) => theme.spacing.xxSmall};
  width: ${remCalc(125)};
`;

export const StyledCounterInput = styled(StyledInput)`
  text-align: center;
  padding: 0;
  overflow: hidden;
`;

StyledCounterButton.defaultProps = { theme: defaultTheme };
StyledCounterInput.defaultProps = { theme: defaultTheme };
StyledCounterWrapper.defaultProps = { theme: defaultTheme };
