import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

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
  (
    gridedProp: GridAreas,
    theme: ThemeInterface,
    cssKey: 'grid-template-areas',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridAutoColumns,
    theme: ThemeInterface,
    cssKey: 'grid-auto-columns',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridAutoFlow,
    theme: ThemeInterface,
    cssKey: 'grid-auto-flow',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridAutoRows,
    theme: ThemeInterface,
    cssKey: 'grid-auto-rows',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridColumns,
    theme: ThemeInterface,
    cssKey: 'grid-template-columns',
  ): FlattenSimpleInterpolation;
  (
    gridedPopr: GridColumnGap,
    theme: ThemeInterface,
    cssKey: 'column-gap',
  ): FlattenSimpleInterpolation;
  (gridedProp: GridGap, theme: ThemeInterface, cssKey: 'gap'): FlattenSimpleInterpolation;
  (
    gridedProp: GridRows,
    theme: ThemeInterface,
    cssKey: 'grid-template-rows',
  ): FlattenSimpleInterpolation;
  (gridedProp: GridRowGap, theme: ThemeInterface, cssKey: 'row-gap'): FlattenSimpleInterpolation;
  (
    gridedProp: GridTemplate,
    theme: ThemeInterface,
    cssKey: 'grid-template',
  ): FlattenSimpleInterpolation;
  (gridedProp: GridArea, theme: ThemeInterface, cssKey: 'grid-area'): FlattenSimpleInterpolation;
  (
    gridedProp: GridColumn,
    theme: ThemeInterface,
    cssKey: 'grid-column',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridColumnEnd,
    theme: ThemeInterface,
    cssKey: 'grid-column-end',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridColumnStart,
    theme: ThemeInterface,
    cssKey: 'grid-column-start',
  ): FlattenSimpleInterpolation;
  (gridedProp: GridRow, theme: ThemeInterface, cssKey: 'grid-row'): FlattenSimpleInterpolation;
  (
    gridedProp: GridRowEnd,
    theme: ThemeInterface,
    cssKey: 'grid-row-end',
  ): FlattenSimpleInterpolation;
  (
    gridedProp: GridRowStart,
    theme: ThemeInterface,
    cssKey: 'grid-row-start',
  ): FlattenSimpleInterpolation;
}
