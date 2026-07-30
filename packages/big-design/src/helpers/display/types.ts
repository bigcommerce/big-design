import { CSSRules, ThemeInterface } from '@bigcommerce/big-design-theme';

import { ResponsiveProp } from '../../types';

type DisplayProp = ResponsiveProp<
  'block' | 'inline-block' | 'inline' | 'inline-flex' | 'flex' | 'grid' | 'inline-grid' | 'none'
>;

export type DisplayProps = Partial<{
  display: DisplayProp;
}>;

// Internal, transient (`$`-prefixed) counterpart of `DisplayProps`. styled-components
// never forwards `$`-prefixed props to the DOM, so tag-target styled components read
// this instead of the public name to avoid leaking it onto real DOM nodes.
export type TransientDisplayProps = Partial<{
  $display: DisplayProp;
}>;

export type DisplayOverload = (
  displayProp: DisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => CSSRules;
