import { remCalc, withDefaultTheme } from '@bigcommerce/big-design-theme';
import { ellipsis } from 'polished';
import styled, { css } from 'styled-components';

import { StyledButton as StyleableButton } from '../Button/styled';
import { Flex } from '../Flex';
import { StyledText as StyleableText } from '../Typography/styled';

import { DropZone, Props } from './DropZone';

const defaultDropZoneHeight = 68;
const getDropZoneHeight = (height = defaultDropZoneHeight) =>
  Math.max(height, defaultDropZoneHeight);

export const StyledDropzone = styled(Flex).attrs(withDefaultTheme)<{
  disabled?: boolean;
  isDragOver: boolean;
  isValid: boolean;
}>`
  width: 100%;
  height: ${remCalc(defaultDropZoneHeight)};
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

  svg {
    width: ${remCalc(40)};
    height: ${remCalc(40)};
    fill: ${({ theme, disabled, isValid, isDragOver }) => {
      if (disabled) {
        return theme.colors.secondary50;
      }

      if (!isValid && isDragOver) {
        return theme.colors.danger30;
      }

      return theme.colors.primary30;
    }};
  }
`;

export const StyledFile = styled(Flex).attrs(withDefaultTheme)<{ isValid: boolean }>`
  height: ${remCalc(68)};
  border: ${({ theme, isValid }) => (isValid ? theme.border.box : theme.border.boxError)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledImage = styled.img.attrs(withDefaultTheme)`
  height: ${remCalc(40)};
  width: ${remCalc(40)};
`;

export const StyledFileUploaderWrapper = styled.div.attrs(withDefaultTheme)`
  display: flex;
  flex-direction: column;
`;

export const StyledText = styled(StyleableText).attrs(withDefaultTheme)`
  ${ellipsis()};
`;

export const StyledButton = styled(StyleableButton).attrs(withDefaultTheme)`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.secondary60 : theme.colors.primary} !important;
`;

export const StyledList = styled.ul.attrs(withDefaultTheme)`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }
`;

export const StyledDropZoneWrapper = styled(DropZone).attrs(withDefaultTheme)<
  Props & { emptyHeight?: number }
>`
  height: ${({ emptyHeight }) => remCalc(getDropZoneHeight(emptyHeight))};
`;
