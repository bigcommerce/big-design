import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { ellipsis } from 'polished';
import styled, { css } from 'styled-components';

import { withMargins } from '../../helpers';
import { type TransientMarginProps } from '../../helpers/margins/margins';
import { withTransition } from '../../helpers/transitions';

interface StyledLinkProps extends TransientMarginProps {
  $ellipsis?: boolean;
  $isExternal?: boolean;
}

export const StyledLink = styled.a<StyledLinkProps>`
  ${withMargins()};
  ${withTransition(['color'], '70ms')}
  ${(props) => props.$ellipsis && ellipsis()};

  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-decoration: none;

  &:active {
    color: ${({ theme }) => theme.colors.primary70};
  }

  &:hover:not(:active) {
    color: ${({ theme }) => theme.colors.primary70};
  }

  ${({ $isExternal, theme }) =>
    $isExternal &&
    css`
      display: inline-flex;
      align-items: center;

      svg {
        flex-shrink: 0;
        margin-left: ${theme.spacing.xxSmall};
      }
    `}
`;

StyledLink.defaultProps = { theme: defaultTheme };
