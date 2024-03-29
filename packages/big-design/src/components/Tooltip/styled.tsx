import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTooltip = styled.div`
  ${({ theme }) => theme.shadow.floating};

  background-color: ${({ theme }) => theme.colors.secondary70};
  max-width: ${({ theme }) => theme.helpers.remCalc(336)};
  padding: ${({ theme }) => theme.spacing.xSmall};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
`;

StyledTooltip.defaultProps = { theme: defaultTheme };
