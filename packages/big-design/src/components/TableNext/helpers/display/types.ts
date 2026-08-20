import type { CSSRules, ThemeInterface } from '@bigcommerce/big-design-theme';

import type { ResponsiveProp } from '../../../../types';

type TableColumnDisplayProp = ResponsiveProp<'table-cell' | 'none'>;

export interface TableColumnDisplayProps {
  display?: TableColumnDisplayProp;
}

// Internal-only transient shape for the styled boundary (LTRAC-1396); TableColumnDisplayProps
// (public) is unchanged.
export interface TransientTableColumnDisplayProps {
  $display?: TableColumnDisplayProp;
}

export type TableColumnDisplayOverload = (
  displayProp: TableColumnDisplayProp,
  theme: ThemeInterface,
  cssKey: 'display',
) => CSSRules;
