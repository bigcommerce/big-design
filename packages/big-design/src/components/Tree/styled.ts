import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledUl = styled.ul<{ show?: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  user-select: none;

  > li > ul {
    padding-left: ${({ theme }) =>
      theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.xxSmall)};
  }
`;

StyledUl.defaultProps = { theme: defaultTheme };
