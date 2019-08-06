import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { Responsive } from '../../types';

type SingleGridAreas = string;
type ResponsiveGridAreas = Responsive<SingleGridAreas>;
type GridAreas = SingleGridAreas | ResponsiveGridAreas;

type SingleGridAutoColumns = string;
type ResponsiveGridAutoColumns = Responsive<SingleGridAutoColumns>;
type GridAutoColumns = SingleGridAutoColumns | ResponsiveGridAutoColumns;

type SingleGridAutoFlow = 'row' | 'column' | 'dense' | 'row dense' | 'column dense' | 'inherit' | 'initial' | 'unset';
type ResponsiveGridAutoFlow = Responsive<SingleGridAutoFlow>;
type GridAutoFlow = SingleGridAutoFlow | ResponsiveGridAutoFlow;

type SingleGridAutoRows = string;
type ResponsiveGridAutoRows = Responsive<SingleGridAutoRows>;
type GridAutoRows = SingleGridAutoRows | ResponsiveGridAutoRows;

type SingleGridColumns = string;
type ResponsiveGridColumns = Responsive<SingleGridColumns>;
type GridColumns = SingleGridColumns | ResponsiveGridColumns;

type SingleGridGap = string;
type ResponsiveGridGap = Responsive<SingleGridGap>;
type GridGap = SingleGridGap | ResponsiveGridGap;

type SingleGridRows = string;
type ResponsiveGridRows = Responsive<SingleGridRows>;
type GridRows = SingleGridRows | ResponsiveGridRows;

type SingleGridTemplate = string;
type ResponsiveGridTemplate = Responsive<SingleGridTemplate>;
type GridTemplate = SingleGridTemplate | ResponsiveGridTemplate;

type SingleGridArea = string;
type ResponsiveGridArea = Responsive<SingleGridArea>;
type GridArea = SingleGridArea | ResponsiveGridArea;

type SingleGridColumn = string;
type ResponsiveGridColumn = Responsive<SingleGridColumn>;
type GridColumn = SingleGridColumn | ResponsiveGridColumn;

type SingleGridColumnEnd = string;
type ResponsiveGridColumnEnd = Responsive<SingleGridColumnEnd>;
type GridColumnEnd = SingleGridColumnEnd | ResponsiveGridColumnEnd;

type SingleGridColumnStart = string;
type ResponsiveGridColumnStart = Responsive<SingleGridColumnStart>;
type GridColumnStart = SingleGridColumnStart | ResponsiveGridColumnStart;

type SingleGridRow = string;
type ResponsiveGridRow = Responsive<SingleGridRow>;
type GridRow = SingleGridRow | ResponsiveGridRow;

type SingleGridRowEnd = string;
type ResponsiveGridRowEnd = Responsive<SingleGridRowEnd>;
type GridRowEnd = SingleGridRowEnd | ResponsiveGridRowEnd;

type SingleGridRowStart = string;
type ResponsiveGridRowStart = Responsive<SingleGridRowStart>;
type GridRowStart = SingleGridRowStart | ResponsiveGridRowStart;

export type GridedProps = Partial<{
  gridAreas: GridAreas;
  gridAutoColumns: GridAutoColumns;
  gridAutoFlow: GridAutoFlow;
  gridAutoRows: GridAutoRows;
  gridColumns: GridColumns;
  gridGap: GridGap;
  gridRows: GridRows;
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
  (gridedProp: GridAreas, theme: ThemeInterface, cssKey: 'grid-template-areas'): FlattenSimpleInterpolation;
  (gridedProp: GridAutoColumns, theme: ThemeInterface, cssKey: 'grid-auto-columns'): FlattenSimpleInterpolation;
  (gridedProp: GridAutoFlow, theme: ThemeInterface, cssKey: 'grid-auto-flow'): FlattenSimpleInterpolation;
  (gridedProp: GridAutoRows, theme: ThemeInterface, cssKey: 'grid-auto-rows'): FlattenSimpleInterpolation;
  (gridedProp: GridColumns, theme: ThemeInterface, cssKey: 'grid-template-columns'): FlattenSimpleInterpolation;
  (gridedProp: GridGap, theme: ThemeInterface, cssKey: 'grid-gap'): FlattenSimpleInterpolation;
  (gridedProp: GridRows, theme: ThemeInterface, cssKey: 'grid-template-rows'): FlattenSimpleInterpolation;
  (gridedProp: GridTemplate, theme: ThemeInterface, cssKey: 'grid-template'): FlattenSimpleInterpolation;
  (gridedProp: GridArea, theme: ThemeInterface, cssKey: 'grid-area'): FlattenSimpleInterpolation;
  (gridedProp: GridColumn, theme: ThemeInterface, cssKey: 'grid-column'): FlattenSimpleInterpolation;
  (gridedProp: GridColumnEnd, theme: ThemeInterface, cssKey: 'grid-column-end'): FlattenSimpleInterpolation;
  (gridedProp: GridColumnStart, theme: ThemeInterface, cssKey: 'grid-column-start'): FlattenSimpleInterpolation;
  (gridedProp: GridRow, theme: ThemeInterface, cssKey: 'grid-row'): FlattenSimpleInterpolation;
  (gridedProp: GridRowEnd, theme: ThemeInterface, cssKey: 'grid-row-end'): FlattenSimpleInterpolation;
  (gridedProp: GridRowStart, theme: ThemeInterface, cssKey: 'grid-row-start'): FlattenSimpleInterpolation;
}
