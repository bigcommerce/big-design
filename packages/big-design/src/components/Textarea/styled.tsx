import { addValues, remCalc, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { TextareaProps } from './Textarea';

export const StyledTextareaWrapper = styled.span<TextareaProps>`
  align-items: center;
  display: flex;
  position: relative;
`;

export const StyledTextarea = styled.textarea<TextareaProps>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  max-height: ${remCalc(224)};
  padding: ${({ theme }) => `${theme.spacing.xxSmall} ${theme.spacing.small}`};
  width: 100%;

  ${({ resize }) =>
    resize
      ? css`
          resize: vertical;
        `
      : css`
          resize: none;
        `};

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
`;

StyledTextarea.defaultProps = { theme: defaultTheme };
StyledTextareaWrapper.defaultProps = { theme: defaultTheme };
