import { rgba } from 'polished';
import { css } from 'styled-components';

import { ButtonProps } from '../../../BasicButton/BasicButton';
import { addValues } from '../helpers/addition';

export default css<ButtonProps>`
  align-items: center;
  appearance: none;
  border-radius: ${({ theme }) => theme.spacing.xxSmall};
  border-style: solid;
  border-width: 1px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  flex: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  justify-content: center;
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  outline: none;
  padding: ${({ theme }) => `0 ${theme.spacing.medium}`};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  width: 100%;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.colors.secondary30};
    pointer-events: none;
  }

  ${({ theme }) => theme.breakpoints.medium} {
    width: auto;
  }

  ${({ icon, theme }) =>
    icon &&
    css`
      padding: 0 ${theme.spacing.xSmall};
    `};

  ${({ iconLeft, theme }) =>
    iconLeft &&
    css`
      padding-left: ${theme.spacing.xSmall};
    `};

  ${({ iconRight, theme }) =>
    iconRight &&
    css`
      padding-right: ${theme.spacing.xSmall};
    `};

  ${props => getButtonStyles(props)}
`;

const ButtonPrimary = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary60};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.primary20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.primary50};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.secondary30};
  }
`;

const ButtonPrimaryDestructive = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.danger};
  border-color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  &:active {
    background-color: ${({ theme }) => theme.colors.danger60};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.danger20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.danger50};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.secondary30};
  }
`;

const ButtonSecondary = css<ButtonProps>`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary20};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.primary20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.primary10};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

const ButtonSecondaryDestructive = css<ButtonProps>`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};

  &:active {
    background-color: ${({ theme }) => theme.colors.danger20};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.danger20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.danger10};
  }

  &[disabled] {
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

const ButtonSubtle = css<ButtonProps>`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.primary};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary20};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.primary20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.primary10};
  }

  &[disabled] {
    border-color: transparent;
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

const ButtonSubtleDestructive = css<ButtonProps>`
  background-color: transparent;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.danger};

  &:active {
    background-color: ${({ theme }) => theme.colors.danger20};
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => rgba(theme.colors.danger20, 1)};
  }

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.danger10};
  }

  &[disabled] {
    border-color: transparent;
    color: ${({ theme }) => theme.colors.secondary30};
  }
`;

function getButtonStyles(props: ButtonProps) {
  const { actionType, variant } = props;

  switch (variant) {
    case 'primary':
      return actionType === 'destructive' ? ButtonPrimaryDestructive : ButtonPrimary;
    case 'secondary':
      return actionType === 'destructive' ? ButtonSecondaryDestructive : ButtonSecondary;
    case 'subtle':
      return actionType === 'destructive' ? ButtonSubtleDestructive : ButtonSubtle;
  }
}
