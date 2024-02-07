import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import { ellipsis } from 'polished';
import styled, { css } from 'styled-components';

import { StyledButton } from '../Button/styled';
import { Flex } from '../Flex';
import { StyledText } from '../Typography/styled';

export const DropzoneStyled = styled(Flex)<{
  disabled?: boolean;
  isDragOver: boolean;
  isValid: boolean;
}>`
  width: 100%;
  height: ${remCalc(68)};
  border: 1px dashed
    ${({ theme, isDragOver, isValid, disabled }) => {
      if (disabled) {
        return theme.colors.secondary30;
      }

      return !isDragOver || isValid ? theme.colors.primary : theme.colors.danger40;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  background-color: ${({ theme, isDragOver, isValid, disabled }) => {
    if (disabled) {
      return theme.colors.secondary20;
    }

    if (!isDragOver) {
      return theme.colors.white;
    }

    return isValid ? theme.colors.primary10 : theme.colors.danger10;
  }};
  cursor: pointer;

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary10};
      }
    `};
`;

export const FileStyled = styled(Flex)<{ isValid: boolean }>`
  height: ${remCalc(68)};
  border: ${({ theme, isValid }) => (isValid ? theme.border.box : theme.border.boxError)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ImageStyled = styled.img`
  height: ${remCalc(40)};
  width: ${remCalc(40)};
`;

export const StyledFileUploaderWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

export const TextEllipsed = styled(StyledText)`
  ${ellipsis()};
`;

export const ButtonStyled = styled(StyledButton)`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secondary60 : theme.colors.primary} !important;
`;

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }
`;

StyledList.defaultProps = { theme: defaultTheme };
DropzoneStyled.defaultProps = { theme: defaultTheme };
FileStyled.defaultProps = { theme: defaultTheme };
