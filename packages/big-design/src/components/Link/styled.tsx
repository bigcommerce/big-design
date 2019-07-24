import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../mixins';

import { LinkProps } from './Link';

export const StyledLink = styled.a<LinkProps>`
  ${withMargins()};

  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
`;

StyledLink.defaultProps = { theme: defaultTheme };
