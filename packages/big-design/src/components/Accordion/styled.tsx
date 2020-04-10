import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

StyledTitle.defaultProps = { theme: defaultTheme };
