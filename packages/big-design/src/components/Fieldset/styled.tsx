import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

StyledFieldset.defaultProps = { theme: defaultTheme };
