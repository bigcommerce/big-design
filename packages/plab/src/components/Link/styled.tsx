import styled from 'styled-components';

import { defaultTheme } from '../../theme';

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

StyledLink.defaultProps = { theme: defaultTheme };
