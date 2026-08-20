import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../../Box';
import type { TransientFlexedItemProps } from '../types';
import { withFlexedItems } from '../withFlex';

import type { FlexItemProps } from './Item';

interface StyledFlexItemProps extends TransientFlexedItemProps {
  forwardedAs?: FlexItemProps['as'];
}

// TODO: Remove the `forwardedAs` manual prop definition when @types get updated
export const StyledFlexItem = styled(Box)<StyledFlexItemProps>`
  ${withFlexedItems()}
`;

StyledFlexItem.defaultProps = { theme: defaultTheme };
