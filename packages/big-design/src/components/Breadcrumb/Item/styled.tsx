import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { styledLinkCSS } from 'src/components/Link/styled';

import { BreadcrumbItemProps } from './Item';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledBreadcrumbItem = styled('div')<BreadcrumbItemProps>`
  ${styledLinkCSS}
`;

StyledBreadcrumbItem.defaultProps = {
  theme: defaultTheme,
};
