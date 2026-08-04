import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import React from 'react';
import styled from 'styled-components';

import { withDisplay } from '../../helpers';
import { TransientDisplayProps } from '../../helpers/display/types';
import { Box } from '../Box';

import { TransientGridedProps } from './types';
import { withGridedContainer } from './withGrid';

interface StyledGridProps extends TransientGridedProps, TransientDisplayProps {
  forwardedAs?: React.ElementType;
}

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledGrid = styled(Box)<StyledGridProps>`
  ${withGridedContainer()}

  display: grid;

  ${withDisplay()}
`;

StyledGrid.defaultProps = { theme: defaultTheme, $gridGap: defaultTheme.spacing.medium };
