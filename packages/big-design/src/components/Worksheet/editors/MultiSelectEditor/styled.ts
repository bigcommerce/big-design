import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const MultiSelectWrapper = styled.div`
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
    display: none;
  }

  [role='option'] {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`;

MultiSelectWrapper.defaultProps = { theme: defaultTheme };
