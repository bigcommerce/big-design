import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const StyledTooltipTrigger = styled.div<{ inline?: boolean }>`
  display: inline-block;

  ${({ inline }) =>
    !inline &&
    css`
      display: block;
      flex-grow: 1;
    `}
`;

export const StyledTooltip = styled.div`
  ${({ theme }) => theme.shadow.floating};

  background-color: ${({ theme }) => theme.colors.secondary70};
  max-width: ${({ theme }) => theme.helpers.remCalc(336)};
  padding: ${({ theme }) => theme.spacing.xSmall};
  z-index: ${({ theme }) => theme.zIndex.tooltip};
`;

StyledTooltip.defaultProps = { theme: defaultTheme };
StyledTooltipTrigger.defaultProps = { theme: defaultTheme };
