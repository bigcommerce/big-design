import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../mixins';
import { withTransition } from '../../mixins/transitions';

import { BreadcrumbProps } from './Breadcrumb';

export const StyledBreadcrumb = styled.div<BreadcrumbProps & { isExternal?: boolean }>`
  ${withMargins()};
  ${withTransition(['color'], '70ms')}

  ${({ isExternal, theme }) =>
    isExternal &&
    css`
      display: inline-flex;
      align-items: center;

      svg {
        flex-shrink: 0;
        margin-left: ${theme.spacing.xxSmall};
      }
    `}
`;

StyledBreadcrumb.defaultProps = { theme: defaultTheme };
