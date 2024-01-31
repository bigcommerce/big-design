import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { withDisplay } from '../../mixins';
import { WithTransients } from '../../utils';
import { StyledBox } from '../Box/styled';

import { FlexProps } from './Flex';
import { withFlexedContainer } from './withFlex';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledFlex = styled(StyledBox)<
  WithTransients<FlexProps & { forwardedAs?: FlexProps['as'] }>
>`
  ${withFlexedContainer()}

  display: flex;

  ${withDisplay()}
`;

StyledFlex.defaultProps = {
  $alignContent: 'stretch',
  $alignItems: 'stretch',
  $flexDirection: { mobile: 'column', tablet: 'row' },
  $flexWrap: 'nowrap',
  $justifyContent: 'flex-start',
  theme: defaultTheme,
};
