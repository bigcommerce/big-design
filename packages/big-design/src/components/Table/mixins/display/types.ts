import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { ResponsiveProp } from '../../../../types';

export type TableColumnDisplayProp = ResponsiveProp<'table-cell' | 'none' | string>;

export type TableColumnDisplayProps = Partial<{
  display: TableColumnDisplayProp;
}>;

export type TableColumnDisplayOverload = (
  displayProp: TableColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => FlattenSimpleInterpolation;
