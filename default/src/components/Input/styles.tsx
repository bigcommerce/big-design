import { css } from 'styled-components';

import { addValues } from '../../theme/helpers/addition';

import { InputProps, StyledIconWrapperProps } from './Input';

export const InputStyles = css<InputProps>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${props => (props.error ? props.theme.border.boxError : props.theme.border.box)};
  border-radius: ${({ theme }) => theme.border.radius};
  color: ${({ theme }) => theme.colors.secondary70};
  box-sizing: border-box;
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding: ${({ theme }) => `${theme.spacing.xxSmall} ${theme.spacing.small}`};
  width: 100%;

  &:hover:not([disabled]) {
    border: ${props => (props.error ? props.theme.border.boxError : `1px solid ${props.theme.colors.secondary40}`)};
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
    props.error
      ? css`
          padding-right: ${addValues(props.theme.spacing.xxLarge, props.theme.spacing.xxSmall)};
        `
      : null};

  ${props =>
    props.iconLeft
      ? css`
          padding-left: ${addValues(props.theme.spacing.xxLarge, props.theme.spacing.xxSmall)};
        `
      : null};
`;

export const InputWrapperStyles = css<InputProps>`
  align-items: center;
  display: flex;
  position: relative;
`;

export const IconWrapperStyles = css<StyledIconWrapperProps>`
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

export const ErrorIconWrapperStyles = css`
  color: ${({ theme }) => theme.colors.danger40};
`;
