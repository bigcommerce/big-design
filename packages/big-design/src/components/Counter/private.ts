import { remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyledInput, StyledInputWrapper, StyledInputWrapperProps } from '../Input/styled';

export const StyledCounterWrapper = styled(StyledInputWrapper)<StyledInputWrapperProps>`
  padding-left: ${({ theme }) => theme.spacing.xxSmall};
  padding-right: ${({ theme }) => theme.spacing.xxSmall};
  width: ${remCalc(125)};
  max-width: ${remCalc(320)};
`;

export const StyledCounterInput = styled(StyledInput)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.none};
`;

StyledCounterInput.defaultProps = { theme: defaultTheme };
StyledCounterWrapper.defaultProps = { theme: defaultTheme };
