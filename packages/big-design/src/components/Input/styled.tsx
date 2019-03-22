import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';
import { addValues } from '../../theme/helpers/addition';

import { InputProps } from './Input';

interface StyledIconWrapperProps {
  position?: 'left' | 'right';
}

export const StyledInputWrapper = styled.span<InputProps>`
  align-items: center;
  display: flex;
  position: relative;
`;

export const StyledInput = styled.input<InputProps>`
  ${({ theme }) => theme.borderRadius.normal};
  ${({ error, theme }) => (error ? theme.border.boxError : theme.border.box)};

  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding: ${({ theme }) => `${theme.spacing.xxSmall} ${theme.spacing.small}`};
  width: 100%;

  &:hover:not([disabled]) {
    ${({ error, theme }) =>
      error
        ? theme.border.boxError
        : css`
            border: 1px solid ${theme.colors.secondary40};
          `}
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${props => (props.error ? props.theme.colors.danger20 : props.theme.colors.primary20)};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary40};
    line-height: ${({ theme }) => theme.lineHeight.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
  }

  ${props =>
    props.error &&
    css`
      padding-right: ${addValues(props.theme.spacing.xxLarge, props.theme.spacing.xxSmall)};
    `};

  ${props =>
    props.iconLeft &&
    css`
      padding-left: ${addValues(props.theme.spacing.xxLarge, props.theme.spacing.xxSmall)};
    `};
`;

export const StyledIconWrapper = styled.span<StyledIconWrapperProps>`
  position: absolute;
  color: ${({ theme }) => theme.colors.secondary60};

  ${props =>
    props.position === 'left'
      ? css`
          left: ${({ theme }) => theme.spacing.small};
        `
      : css`
          right: ${({ theme }) => theme.spacing.small};
        `};
`;

export const StyledErrorIconWrapper = styled(StyledIconWrapper)`
  color: ${({ theme }) => theme.colors.danger40};
`;

StyledInput.defaultProps = { theme: defaultTheme };
StyledInputWrapper.defaultProps = { theme: defaultTheme };
StyledIconWrapper.defaultProps = { theme: defaultTheme, position: 'left' };
StyledErrorIconWrapper.defaultProps = { theme: defaultTheme, position: 'right' };
