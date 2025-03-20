import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../helpers';

import { LozengeProps } from './Lozenge';

export const StyledLozenge = styled.span<Omit<LozengeProps, 'label'>>`
  ${withMargins()};

  border-radius: ${({ theme }) => theme.spacing.medium};
  display: inline-flex;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  line-height: ${({ theme }) => theme.lineHeight.small};
  text-align: center;
  padding-block: ${({ theme }) => theme.spacing.xxSmall};
  user-select: none;
  vertical-align: middle;
  padding-inline: ${({ theme, tooltipIcon }) =>
    tooltipIcon ? `${theme.spacing.small} ${theme.spacing.xxSmall}` : theme.spacing.small};
  white-space: nowrap;

  ${({ theme, variant }) =>
    variant === 'alpha' &&
    css`
      background-color: ${theme.colors.warning20};
      color: ${theme.colors.secondary70};
    `}

  ${({ theme, variant }) =>
    variant === 'beta' &&
    css`
      background-color: ${theme.colors.primary20};
      color: ${theme.colors.primary50};
    `}

  ${({ theme, variant }) =>
    variant === 'deprecated' &&
    css`
      color: ${theme.colors.danger70};
      background-color: ${theme.colors.danger20};
    `}

  ${({ theme, variant }) =>
    variant === 'legacy' &&
    css`
      background-color: ${theme.colors.secondary30};
      color: ${theme.colors.secondary70};
    `}

  ${({ theme, variant }) =>
    variant === 'new' &&
    css`
      background-color: ${theme.colors.success20};
      color: ${theme.colors.success70};
    `}
`;

StyledLozenge.defaultProps = {
  theme: defaultTheme,
  variant: 'new',
  tooltipIcon: false,
};
