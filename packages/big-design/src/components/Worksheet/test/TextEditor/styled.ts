import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  padding: 0;

  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.small};

  &:focus {
    outline: none;
  }
`;

StyledInput.defaultProps = { theme: defaultTheme };
