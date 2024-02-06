import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { RuleSet } from 'styled-components';

import { ResponsiveProp } from '../../types';

type DisplayProp = ResponsiveProp<
  'block' | 'inline-block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'inline-grid' | 'none'
>;

export type DisplayProps = Partial<{
  display: DisplayProp;
}>;

export type DisplayOverload = (
  displayProp: DisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => RuleSet;
