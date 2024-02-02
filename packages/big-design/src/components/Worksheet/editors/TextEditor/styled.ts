import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { css, styled } from 'styled-components';

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

StyledInput.defaultProps = { theme: defaultTheme };
