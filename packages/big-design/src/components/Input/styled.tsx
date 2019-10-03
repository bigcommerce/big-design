import { addValues, remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { InputProps } from './Input';

interface StyledInputWrapperProps extends InputProps {
  focus: boolean;
}

export const StyledInputWrapper = styled.span<StyledInputWrapperProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  box-sizing: border-box;
  display: flex;
  min-height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  padding: ${({ theme }) => `${theme.spacing.xxSmall} ${theme.spacing.small}`};
  width: 100%;

  ${({ error, theme }) =>
    css`
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
  border: 0;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  flex: 1;
  height: ${({ theme }) => theme.spacing.xLarge};
  margin-top: ${({ theme }) => theme.spacing.xxSmall};
  padding: 0;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary40};
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
  }

  ${props =>
    props.iconRight &&
    css`
      padding-right: ${props.theme.spacing.xxSmall};
    `};

  ${props =>
    props.iconLeft &&
    css`
      padding-left: ${props.theme.spacing.xxSmall};
    `};

  ${props =>
    props.chips &&
    css`
      padding-left: ${props.theme.spacing.xxSmall};
    `};
`;

export const StyledIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary60};
  flex: 0 0 ${({ theme }) => theme.spacing.xLarge};
  height: ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledInputContent = styled.div<InputProps>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
  margin-top: -${({ theme }) => theme.spacing.xxSmall};

  ${props =>
    props.chips &&
    css`
      margin-left: -${props.theme.spacing.xxSmall};
    `};
`;

StyledInput.defaultProps = { theme: defaultTheme };
StyledInputWrapper.defaultProps = { theme: defaultTheme };
StyledIconWrapper.defaultProps = { theme: defaultTheme };
StyledInputContent.defaultProps = { theme: defaultTheme };
