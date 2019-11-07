import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withDisplay } from '../../mixins';
import { Box } from '../Box';

import { withFlexedContainer } from './withFlex';
import { FlexProps } from './Flex';

export const StyledFlex = styled(Box)<FlexProps>`
  ${withFlexedContainer()}

  display: flex;

  ${withDisplay()}
`;

StyledFlex.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  flexDirection: { mobile: 'column', tablet: 'row' },
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  theme: defaultTheme,
};
