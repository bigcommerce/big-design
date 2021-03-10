import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { ResponsiveProp } from '../../types';

type DisplayProp = ResponsiveProp<
  'block' | 'inline-block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'inline-grid' | 'table-cell' | 'none'
>;

export type DisplayProps = Partial<{
  display: DisplayProp;
}>;

export type DisplayOverload = (
  displayProp: DisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => FlattenSimpleInterpolation;
