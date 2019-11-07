import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { Responsive } from '../../types';

type SingleDisplayProp = 'block' | 'inline-block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'inline-grid' | 'none';
type ResponsiveDisplayProp = Responsive<SingleDisplayProp>;
type DisplayProp = SingleDisplayProp | ResponsiveDisplayProp;

export type DisplayProps = Partial<{
  display: DisplayProp;
}>;

export type DisplayOverload = (
  displayProp: DisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => FlattenSimpleInterpolation;
