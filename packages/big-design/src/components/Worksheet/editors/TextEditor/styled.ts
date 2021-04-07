import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const StyledInput = styled.input<{ isEdited: boolean }>`
  border: 0;
  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  height: 100%;
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

StyledInput.defaultProps = { theme: defaultTheme };
