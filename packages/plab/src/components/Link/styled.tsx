import styled from 'styled-components';

import { withMargins } from '../../mixins';
import { defaultTheme } from '../../theme';

import { LinkProps } from './Link';

export const StyledLink = styled.a<LinkProps>`
  ${withMargins()};

  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`;

StyledLink.defaultProps = { theme: defaultTheme };
