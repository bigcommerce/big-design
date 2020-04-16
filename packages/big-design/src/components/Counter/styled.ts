import { remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../Button/private';
import { StyledInput, StyledInputWrapper, StyledInputWrapperProps } from '../Input/private';

export const StyledCounterButton = styled(StyleableButton)`
  background-color: inherit;
  border: none;

  &[disabled],
  &:active,
  &:hover:not(:active) {
    background-color: inherit;
  }
`;

export const StyledCounterWrapper = styled(StyledInputWrapper)<StyledInputWrapperProps>`
  padding: 0 ${({ theme }) => theme.spacing.xxSmall};
  width: ${remCalc(125)};
`;

export const StyledCounterInput = styled(StyledInput)`
  text-align: center;
  padding: 0;
`;

StyledCounterInput.defaultProps = { theme: defaultTheme };
StyledCounterWrapper.defaultProps = { theme: defaultTheme };
