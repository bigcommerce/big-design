import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';
import { HeadingProps } from '../../Typography/types';

export const StyledFieldsetLegend = styled<
  StyledComponent<'legend' | 'h4', DefaultTheme, Partial<HeadingProps>>
>(StyleableH4).attrs({ as: 'legend' })`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
  }
`;

StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
