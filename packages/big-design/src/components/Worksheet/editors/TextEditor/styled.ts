import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../../../Button/Button';

export const StyledInput = styled.input<{ isEdited: boolean }>`
  background-color: ${({ theme }) => theme.colors.inherit};
  border: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
  margin: 0;
  padding: 0;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${({ isEdited }) =>
    isEdited &&
    css`
      background-color: ${({ theme }) => theme.colors.warning10};
    `}
`;

export const ActionButton = styled(StyleableButton)`
  height: ${remCalc(18)};
  padding: 0;

  svg {
    height: ${remCalc(16)};
    width: ${remCalc(16)};
  }
`;

StyledInput.defaultProps = { theme: defaultTheme };
