import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { RuleSet } from 'styled-components';

import { ResponsiveProp } from '../../types';

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

export type GridedItemProps = Partial<{
  gridArea: GridArea;
  gridColumn: GridColumn;
  gridColumnEnd: GridColumnEnd;
  gridColumnStart: GridColumnStart;
  gridRow: GridRow;
  gridRowEnd: GridRowEnd;
  gridRowStart: GridRowStart;
}>;

export interface GridedOverload {
  (gridedProp: GridAreas, theme: ThemeInterface, cssKey: 'grid-template-areas'): RuleSet;
  (gridedProp: GridAutoColumns, theme: ThemeInterface, cssKey: 'grid-auto-columns'): RuleSet;
  (gridedProp: GridAutoFlow, theme: ThemeInterface, cssKey: 'grid-auto-flow'): RuleSet;
  (gridedProp: GridAutoRows, theme: ThemeInterface, cssKey: 'grid-auto-rows'): RuleSet;
  (gridedProp: GridColumns, theme: ThemeInterface, cssKey: 'grid-template-columns'): RuleSet;
  (gridedPopr: GridColumnGap, theme: ThemeInterface, cssKey: 'column-gap'): RuleSet;
  (gridedProp: GridGap, theme: ThemeInterface, cssKey: 'gap'): RuleSet;
  (gridedProp: GridRows, theme: ThemeInterface, cssKey: 'grid-template-rows'): RuleSet;
  (gridedProp: GridRowGap, theme: ThemeInterface, cssKey: 'row-gap'): RuleSet;
  (gridedProp: GridTemplate, theme: ThemeInterface, cssKey: 'grid-template'): RuleSet;
  (gridedProp: GridArea, theme: ThemeInterface, cssKey: 'grid-area'): RuleSet;
  (gridedProp: GridColumn, theme: ThemeInterface, cssKey: 'grid-column'): RuleSet;
  (gridedProp: GridColumnEnd, theme: ThemeInterface, cssKey: 'grid-column-end'): RuleSet;
  (gridedProp: GridColumnStart, theme: ThemeInterface, cssKey: 'grid-column-start'): RuleSet;
  (gridedProp: GridRow, theme: ThemeInterface, cssKey: 'grid-row'): RuleSet;
  (gridedProp: GridRowEnd, theme: ThemeInterface, cssKey: 'grid-row-end'): RuleSet;
  (gridedProp: GridRowStart, theme: ThemeInterface, cssKey: 'grid-row-start'): RuleSet;
}
