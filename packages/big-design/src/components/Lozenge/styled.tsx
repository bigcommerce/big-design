import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Box } from '../Box';

import { LozengeProps } from './Lozenge';

interface StyledLozengeProps extends Omit<LozengeProps, 'label' | 'tooltipContent'> {
  hasTooltip?: boolean;
}

const sharedLozengeStyles = css`
  border-radius: ${({ theme }) => theme.spacing.medium};
  display: inline-flex;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  line-height: ${({ theme }) => theme.lineHeight.small};
  text-align: center;
  padding-block: ${({ theme }) => theme.spacing.xxSmall};
  vertical-align: middle;
  padding-inline-start: ${({ theme }) => theme.spacing.xSmall};
  white-space: nowrap;
`;

const variantStyles = {
  alpha: {
    idle: css`
      background-color: ${({ theme }) => theme.colors.warning20};
      color: ${({ theme }) => theme.colors.secondary70};
      svg {
        fill: ${({ theme }) => theme.colors.warning70};
      }
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.warning10};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.warning30};
    `,
  },
  beta: {
    idle: css`
      background-color: ${({ theme }) => theme.colors.primary20};
      color: ${({ theme }) => theme.colors.primary50};
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.primary10};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.primary30};
    `,
  },
  deprecated: {
    idle: css`
      background-color: ${({ theme }) => theme.colors.danger20};
      color: ${({ theme }) => theme.colors.danger70};
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.danger10};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.danger30};
    `,
  },
  legacy: {
    idle: css`
      background-color: ${({ theme }) => theme.colors.secondary30};
      color: ${({ theme }) => theme.colors.secondary70};
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.secondary20};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.secondary30};
    `,
  },
  new: {
    idle: css`
      background-color: ${({ theme }) => theme.colors.success20};
      color: ${({ theme }) => theme.colors.success70};
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.success10};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.success30};
    `,
  },
  'early-access': {
    idle: css`
      background-color: ${({ theme }) => theme.colors.success20};
      color: ${({ theme }) => theme.colors.success70};
    `,
    hover: css`
      outline: 1px solid ${({ theme }) => theme.colors.success10};
    `,
    focus: css`
      outline: 3px solid ${({ theme }) => theme.colors.success30};
    `,
  },
};

export const StyledLozenge = styled(Box)<StyledLozengeProps>`
  ${sharedLozengeStyles}
  padding-inline-end: ${({ theme, hasTooltip }) =>
    hasTooltip ? theme.spacing.xxSmall : theme.spacing.small};
  ${({ variant = 'new' }) => variantStyles[variant].idle};
`;

export const StyledLozengeButton = styled.button<StyledLozengeProps>`
  ${sharedLozengeStyles}
  padding-inline-end: ${({ theme }) => theme.spacing.xxSmall};
  user-select: none;
  cursor: pointer;
  border: none;

  ${({ variant = 'new' }) => variantStyles[variant].idle};

  svg:last-child {
    transition: transform 0.3s ease;
  }

  &[aria-expanded='true'] {
    svg:last-child {
      transform: rotate(-180deg);
      transition: transform 0.3s ease;
    }
  }

  &:hover {
    ${({ variant = 'new' }) => variantStyles[variant].hover};
  }
  &:focus {
    ${({ variant = 'new' }) => variantStyles[variant].focus};
  }
`;

StyledLozenge.defaultProps = {
  theme: defaultTheme,
  hasTooltip: false,
};

StyledLozengeButton.defaultProps = {
  theme: defaultTheme
};
