import { addValues, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { MarginProps, withMargins } from '../../mixins';
import { withTransition } from '../../mixins/transitions';
import { Flex } from '../Flex';

import { ButtonProps } from './index';

export const StyledButton = styled.button<ButtonProps & MarginProps>`
  ${withTransition(['background-color', 'border-color', 'box-shadow', 'color'])}

  && {
    ${withMargins()};
  }

  align-items: center;
  appearance: none;
  border: ${({ theme }) => theme.border.box};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  flex: none;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  justify-content: center;
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  outline: none;
  padding: ${({ theme }) => `0 ${theme.spacing.medium}`};
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;

  &:focus {
    outline: none;
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.colors.secondary30};
    pointer-events: none;
  }

  & + .bd-button {
    margin-top: ${({ theme }) => theme.spacing.xSmall};

    ${({ theme }) => theme.breakpoints.tablet} {
      margin-top: ${({ theme }) => theme.spacing.none};
      margin-left: ${({ theme }) => theme.spacing.xSmall};
    }
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    width: auto;
  }

  ${({ iconOnly: icon, theme }) =>
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

  ${(props) => getButtonStyles(props)}
`;

export const ContentWrapper = styled.span.attrs<{}, { isLoading?: boolean }>({})`
  align-content: center;
  align-items: center;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export const LoadingSpinnerWrapper = styled(Flex)`
  position: absolute;
`;

/**
 * These can be generated dynamically but I'm leaning towards being extra
 * explicit and being able to handle corner cases and changes from design easily
 */
const ButtonPrimary = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  &:active {
    background-color: ${({ theme }) => theme.colors.primary60};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
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
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};

  &:active {
    background-color: ${({ theme }) => theme.colors.danger60};
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.danger20}`};
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
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
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
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.danger20}`};
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
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
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
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.danger20}`};
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

StyledButton.defaultProps = { theme: defaultTheme };
ContentWrapper.defaultProps = { theme: defaultTheme };
LoadingSpinnerWrapper.defaultProps = { theme: defaultTheme };
