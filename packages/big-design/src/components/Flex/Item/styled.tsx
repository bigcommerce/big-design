import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../../Box';

import { FlexItemProps } from './Item';

export const StyledFlexItem = styled(Box)<FlexItemProps>`
  align-self: ${({ alignSelf }) => alignSelf};
  flex-basis: ${({ basis }) => basis};
  flex-grow: ${({ grow }) => grow};
  flex-shrink: ${({ shrink }) => shrink};
  order: ${({ order }) => order};
`;

StyledFlexItem.defaultProps = {
  alignSelf: 'auto',
  basis: 'auto',
  grow: 0,
  order: 0,
  shrink: 1,
  theme: defaultTheme,
};
