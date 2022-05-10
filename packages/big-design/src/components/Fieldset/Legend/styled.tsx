import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableH4 } from '../../Typography/private';

export const StyledFieldsetLegend = styled(StyleableH4).attrs({ as: 'legend' })`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
  }
`;

StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
