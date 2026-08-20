import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import type React from 'react';
import styled from 'styled-components';

import { withDisplay } from '../../helpers';
import type { TransientDisplayProps } from '../../helpers/display/types';
import { Box } from '../Box';

import type { TransientFlexedProps } from './types';
import { withFlexedContainer } from './withFlex';

interface StyledFlexProps extends TransientFlexedProps, TransientDisplayProps {
  forwardedAs?: React.ElementType;
}

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledFlex = styled(Box)<StyledFlexProps>`
  ${withFlexedContainer()}

  display: flex;

  ${withDisplay()}
`;

StyledFlex.defaultProps = { theme: defaultTheme };
