import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withDisplay } from '../../helpers';
import { Box } from '../Box';

import { FlexProps } from './Flex';
import { withFlexedContainer } from './withFlex';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledFlex = styled(Box).attrs(withDefaultTheme)<
  FlexProps & { forwardedAs?: FlexProps['as'] }
>`
  ${withFlexedContainer()}

  display: flex;

  ${withDisplay()}
`;
