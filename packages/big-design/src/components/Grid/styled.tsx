import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';

import { withGridedContainer } from './withGrid';
import { GridProps } from './Grid';

export const StyledGrid = styled(Box)<GridProps>`
  ${withGridedContainer()}

  display: grid;
`;

StyledGrid.defaultProps = { theme: defaultTheme, gridGap: defaultTheme.spacing.medium };
