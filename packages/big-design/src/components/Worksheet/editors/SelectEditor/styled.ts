import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

export const SelectWrapper = styled.div`
  span {
    background-color: ${({ theme }) => theme.colors.inherit};
    border: none;
    box-shadow: none;

    &:hover:not([disabled]) {
      border: none;
    }

    &[disabled] {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }

  input {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};

    &[disabled] {
      background-color: ${({ theme }) => theme.colors.inherit};
      color: ${({ theme }) => theme.colors.secondary50};
      cursor: default;
    }
  }

  [role='option'] {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

SelectWrapper.defaultProps = { theme: defaultTheme };
