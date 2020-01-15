import { addValues, remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withPaddings, PaddingProps } from '../../mixins';
import { withTransition } from '../../mixins/transitions';

import { InputProps } from './Input';

interface StyledInputWrapperProps extends InputProps {
  focus: boolean;
}

export const StyledInputWrapper = styled.span<StyledInputWrapperProps>`
  ${withTransition(['border', 'box-shadow'])}

  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  box-sizing: border-box;
  display: flex;
  min-height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  position: relative;
  width: 100%;

  ${({ error, theme }) => css`
    border: ${error ? theme.border.boxError : theme.border.box};
  `};

  &:hover:not([disabled]) {
    ${({ error, theme }) =>
      error
        ? css`
            border: ${theme.border.boxError};
          `
        : css`
            border: 1px solid ${theme.colors.secondary40};
          `}
  }

  ${({ error, focus, theme }) =>
    focus &&
    css`
      outline: none;
      box-shadow: 0 0 0 4px ${error ? theme.colors.danger20 : theme.colors.primary20};
    `};

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }
`;

export const StyledInput = styled.input<InputProps>`
  background-color: inherit;
  border: 0;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  flex: 1;
  height: 100%;
  padding: 0;
  padding-left: ${({ theme }) => theme.spacing.xSmall};
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary40};
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
  }

  &:-webkit-autofill {
    /* !important overrides user agent style sheets that use !important in their :-webkit-autofill implementation */
    /* See https://developer.mozilla.org/en-US/docs/Web/CSS/:-webkit-autofill */
    background-color: ${({ theme }) => theme.colors.primary10} !important;
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.primary10} inset;
  }

  ${({ iconRight, theme }) =>
    iconRight &&
    css`
      padding-right: ${addValues(theme.spacing.xxSmall, theme.spacing.xxLarge)};
    `};

  ${({ iconLeft, theme }) =>
    iconLeft &&
    css`
      padding-left: ${addValues(theme.spacing.xxSmall, theme.spacing.xxLarge)};
    `};

  ${({ chips, theme }) =>
    chips &&
    css`
      min-height: ${theme.spacing.xLarge};
      padding-left: ${theme.spacing.xxSmall};
      padding-right: ${theme.spacing.none};
    `};

  ${({ chips, theme }) =>
    chips &&
    chips.length &&
    css`
      margin-top: ${theme.spacing.xxSmall};
    `};

  ${({ chips }) =>
    !chips &&
    css`
      min-height: ${remCalc(34)};
    `};

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }
`;

export const StyledIconWrapper = styled.div<PaddingProps>`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary60};
  display: flex;
  height: 100%;
  position: absolute;
  top: 0;

  ${withPaddings()}

  ${({ paddingLeft }) =>
    paddingLeft === 'xSmall' &&
    css`
      left: 0;
    `}

  ${({ paddingRight }) =>
    paddingRight === 'xSmall' &&
    css`
      right: 0;
    `}
`;

export const StyledInputContent = styled.div<InputProps>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;

  ${({ chips, theme }) =>
    chips &&
    css`
      margin-left: ${theme.spacing.xxSmall};
      padding-right: ${addValues(theme.spacing.xxSmall, theme.spacing.xxLarge)};
    `};

  ${({ chips, theme }) =>
    chips &&
    chips.length &&
    css`
      margin-bottom: ${theme.spacing.xxSmall};
    `};
`;

StyledInput.defaultProps = { theme: defaultTheme };
StyledInputWrapper.defaultProps = { theme: defaultTheme };
StyledIconWrapper.defaultProps = { theme: defaultTheme };
StyledInputContent.defaultProps = { theme: defaultTheme };
