import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withFlexedItems } from '../../../mixins';
import { Box } from '../../Box';

import { FlexItemProps } from './Item';

export const StyledFlexItem = styled(Box)<FlexItemProps>`
  ${withFlexedItems()}
`;

StyledFlexItem.defaultProps = {
  alignSelf: 'auto',
  flexBasis: 'auto',
  flexGrow: 0,
  flexOrder: 0,
  flexShrink: 1,
  theme: defaultTheme,
};
