import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  user-select: none;

  > li > ul {
    margin-left: ${({ theme }) => theme.spacing.xLarge};
  }
`;

StyledUl.defaultProps = { theme: defaultTheme };
