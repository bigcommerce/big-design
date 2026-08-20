import { type CSSRules, type ThemeInterface } from '@bigcommerce/big-design-theme';

import { type ResponsiveProp } from '../../types';

type GridAreas = ResponsiveProp<string>;

type GridAutoColumns = ResponsiveProp<string>;

type GridAutoFlow = ResponsiveProp<
  'row' | 'column' | 'dense' | 'row dense' | 'column dense' | 'inherit' | 'initial' | 'unset'
>;

type GridAutoRows = ResponsiveProp<string>;

type GridColumns = ResponsiveProp<string>;

type GridColumnGap = ResponsiveProp<string>;

type GridGap = ResponsiveProp<string>;

type GridRows = ResponsiveProp<string>;

type GridTemplate = ResponsiveProp<string>;

type GridArea = ResponsiveProp<string>;

type GridColumn = ResponsiveProp<string>;

type GridColumnEnd = ResponsiveProp<string>;

type GridColumnStart = ResponsiveProp<string>;

type GridRow = ResponsiveProp<string>;

type GridRowEnd = ResponsiveProp<string>;

type GridRowGap = ResponsiveProp<string>;

type GridRowStart = ResponsiveProp<string>;

export type GridedProps = Partial<{
  gridAreas: GridAreas;
  gridAutoColumns: GridAutoColumns;
  gridAutoFlow: GridAutoFlow;
  gridAutoRows: GridAutoRows;
  gridColumns: GridColumns;
  gridColumnGap: GridColumnGap;
  gridGap: GridGap;
  gridRows: GridRows;
  gridRowGap: GridRowGap;
  gridTemplate: GridTemplate;
}>;

export type TransientGridedProps = Partial<{
  $gridAreas: GridAreas;
  $gridAutoColumns: GridAutoColumns;
  $gridAutoFlow: GridAutoFlow;
  $gridAutoRows: GridAutoRows;
  $gridColumns: GridColumns;
  $gridColumnGap: GridColumnGap;
  $gridGap: GridGap;
  $gridRows: GridRows;
  $gridRowGap: GridRowGap;
  $gridTemplate: GridTemplate;
}>;

export type GridedItemProps = Partial<{
  gridArea: GridArea;
  gridColumn: GridColumn;
  gridColumnEnd: GridColumnEnd;
  gridColumnStart: GridColumnStart;
  gridRow: GridRow;
  gridRowEnd: GridRowEnd;
  gridRowStart: GridRowStart;
}>;

export type TransientGridedItemProps = Partial<{
  $gridArea: GridArea;
  $gridColumn: GridColumn;
  $gridColumnEnd: GridColumnEnd;
  $gridColumnStart: GridColumnStart;
  $gridRow: GridRow;
  $gridRowEnd: GridRowEnd;
  $gridRowStart: GridRowStart;
}>;

export interface GridedOverload {
  (gridedProp: GridAreas, theme: ThemeInterface, cssKey: 'grid-template-areas'): CSSRules;
  (gridedProp: GridAutoColumns, theme: ThemeInterface, cssKey: 'grid-auto-columns'): CSSRules;
  (gridedProp: GridAutoFlow, theme: ThemeInterface, cssKey: 'grid-auto-flow'): CSSRules;
  (gridedProp: GridAutoRows, theme: ThemeInterface, cssKey: 'grid-auto-rows'): CSSRules;
  (gridedProp: GridColumns, theme: ThemeInterface, cssKey: 'grid-template-columns'): CSSRules;
  (gridedPopr: GridColumnGap, theme: ThemeInterface, cssKey: 'column-gap'): CSSRules;
  (gridedProp: GridGap, theme: ThemeInterface, cssKey: 'gap'): CSSRules;
  (gridedProp: GridRows, theme: ThemeInterface, cssKey: 'grid-template-rows'): CSSRules;
  (gridedProp: GridRowGap, theme: ThemeInterface, cssKey: 'row-gap'): CSSRules;
  (gridedProp: GridTemplate, theme: ThemeInterface, cssKey: 'grid-template'): CSSRules;
  (gridedProp: GridArea, theme: ThemeInterface, cssKey: 'grid-area'): CSSRules;
  (gridedProp: GridColumn, theme: ThemeInterface, cssKey: 'grid-column'): CSSRules;
  (gridedProp: GridColumnEnd, theme: ThemeInterface, cssKey: 'grid-column-end'): CSSRules;
  (gridedProp: GridColumnStart, theme: ThemeInterface, cssKey: 'grid-column-start'): CSSRules;
  (gridedProp: GridRow, theme: ThemeInterface, cssKey: 'grid-row'): CSSRules;
  (gridedProp: GridRowEnd, theme: ThemeInterface, cssKey: 'grid-row-end'): CSSRules;
  (gridedProp: GridRowStart, theme: ThemeInterface, cssKey: 'grid-row-start'): CSSRules;
}
