import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../mixins';

import { LinkProps } from './Link';

export const StyledLink = styled.a<LinkProps>`
  ${withMargins()};

  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
`;

StyledLink.defaultProps = { theme: defaultTheme };
