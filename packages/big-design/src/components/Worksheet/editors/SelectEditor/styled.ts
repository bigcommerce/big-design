import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const SelectWrapper = styled.div<{ isEdited: boolean }>`
  span {
    background-color: ${({ theme }) => theme.colors.transparent};
    border: none;
    box-shadow: none;

    &:hover:not([disabled]) {
      border: none;
    }
  }

  input {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};

    ${({ isEdited }) =>
      isEdited &&
      css`
        background-color: ${({ theme }) => theme.colors.warning10};
      `}
  }

  [role='option'] {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

SelectWrapper.defaultProps = { theme: defaultTheme };
