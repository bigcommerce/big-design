import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { WithTransients } from '../../../utils';
import { StyledBox } from '../../Box/styled';
import { withFlexedItems } from '../withFlex';

import { FlexItemProps } from './Item';

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledFlexItem = styled(StyledBox)<
  WithTransients<FlexItemProps & { forwardedAs?: FlexItemProps['as'] }>
>`
  ${withFlexedItems()}
`;

StyledFlexItem.defaultProps = {
  $alignSelf: 'auto',
  $flexBasis: 'auto',
  $flexGrow: 0,
  $flexOrder: 0,
  $flexShrink: 1,
  theme: defaultTheme,
};
