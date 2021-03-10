import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { ResponsiveProp } from '../../types';

type DisplayProp = ResponsiveProp<
  'block' | 'inline-block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'inline-grid' | 'none'
>;

export type DisplayProps = Partial<{
  display: DisplayProp;
}>;

type ColumnDisplayProp = ResponsiveProp<'table-cell' | 'none'>;

export type ColumnDisplayProps = Partial<{
  display: ColumnDisplayProp;
}>;

export type DisplayOverload = (
  displayProp: DisplayProp | ColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => FlattenSimpleInterpolation;
