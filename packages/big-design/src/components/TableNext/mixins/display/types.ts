import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { ResponsiveProp } from '../../../../types';

type TableColumnDisplayProp = ResponsiveProp<'table-cell' | 'none'>;

export interface TableColumnDisplayProps {
  display?: TableColumnDisplayProp;
}

export type TableColumnDisplayOverload = (
  displayProp: TableColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => FlattenSimpleInterpolation;
