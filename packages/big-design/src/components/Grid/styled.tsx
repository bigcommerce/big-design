import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withDisplay } from '../../helpers';
import { TransientDisplayProps } from '../../helpers/display/types';
import { Box } from '../Box';

import { GridProps } from './Grid';
import { withGridedContainer } from './withGrid';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledGrid = styled(Box)<
  GridProps & TransientDisplayProps & { forwardedAs?: GridProps['as'] }
>`
  ${withGridedContainer()}

  display: grid;

  ${withDisplay()}
`;

StyledGrid.defaultProps = { theme: defaultTheme, gridGap: defaultTheme.spacing.medium };
