import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH3 } from '../../Typography/private';

export const StyledFieldsetLegend = styled(StyleableH3).attrs({ as: 'legend' })`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
  }
` as StyledComponent<'legend', DefaultTheme>;

StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
