import { remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTooltipTrigger = styled.div`
  display: inline-block;
`;

export const StyledTooltip = styled.div`
  ${({ theme }) => theme.shadow.floating};

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  max-width: ${remCalc(300)};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
`;

StyledTooltip.defaultProps = { theme: defaultTheme };
StyledTooltipTrigger.defaultProps = { theme: defaultTheme };
