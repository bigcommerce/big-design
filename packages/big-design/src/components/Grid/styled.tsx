import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { withDisplay } from '../../mixins';
import { WithTransients } from '../../utils';
import { StyledBox } from '../Box/styled';

import { GridProps } from './Grid';
import { withGridedContainer } from './withGrid';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledGrid = styled(StyledBox)<
  WithTransients<GridProps & { forwardedAs?: GridProps['as'] }>
>`
  ${withGridedContainer()}

  display: grid;

  ${withDisplay()}
`;

StyledGrid.defaultProps = { theme: defaultTheme, $gridGap: defaultTheme.spacing.medium };
