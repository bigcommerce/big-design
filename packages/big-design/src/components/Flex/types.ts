import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { FlattenSimpleInterpolation } from 'styled-components';

import { ResponsiveProp } from '../../types';

type AlignContent = ResponsiveProp<
  | 'normal'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
>;

type AlignItems = ResponsiveProp<
  'normal' | 'flex-start' | 'flex-end' | 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'baseline' | 'stretch'
>;

type AlignSelf = ResponsiveProp<
  'auto' | 'normal' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
>;

type FlexBasis = ResponsiveProp<'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string>;

type FlexColumnGap = ResponsiveProp<string>;

type FlexDirection = ResponsiveProp<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

type FlexGap = ResponsiveProp<string>;

type FlexGrow = ResponsiveProp<number>;

type FlexOrder = ResponsiveProp<number>;

type FlexRowGap = ResponsiveProp<string>;

type FlexShrink = ResponsiveProp<number>;

type FlexWrap = ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>;

type JustifyContent = ResponsiveProp<
  | 'normal'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'left'
  | 'right'
  | 'baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
>;

export type FlexedProps = Partial<{
  alignContent: AlignContent;
  alignItems: AlignItems;
  flexColumnGap: FlexColumnGap;
  flexDirection: FlexDirection;
  flexGap: FlexGap;
  flexRowGap: FlexRowGap;
  flexWrap: FlexWrap;
  justifyContent: JustifyContent;
}>;

export type FlexedItemProps = Partial<{
  alignSelf: AlignSelf;
  flexBasis: FlexBasis;
  flexGrow: FlexGrow;
  flexOrder: FlexOrder;
  flexShrink: FlexShrink;
}>;

export interface FlexedOverload {
  (flexedProp: AlignContent, theme: ThemeInterface, cssKey: 'align-content'): FlattenSimpleInterpolation;
  (flexedProp: AlignItems, theme: ThemeInterface, cssKey: 'align-items'): FlattenSimpleInterpolation;
  (flexedProp: FlexColumnGap, theme: ThemeInterface, cssKey: 'column-gap'): FlattenSimpleInterpolation;
  (flexedProp: FlexDirection, theme: ThemeInterface, cssKey: 'flex-direction'): FlattenSimpleInterpolation;
  (flexedProp: FlexGap, theme: ThemeInterface, cssKey: 'gap'): FlattenSimpleInterpolation;
  (flexedProp: FlexRowGap, theme: ThemeInterface, cssKey: 'row-gap'): FlattenSimpleInterpolation;
  (flexedProp: FlexWrap, theme: ThemeInterface, cssKey: 'flex-wrap'): FlattenSimpleInterpolation;
  (flexedProp: JustifyContent, theme: ThemeInterface, cssKey: 'justify-content'): FlattenSimpleInterpolation;
  (flexedProp: AlignSelf, theme: ThemeInterface, cssKey: 'align-self'): FlattenSimpleInterpolation;
  (flexedProp: FlexBasis, theme: ThemeInterface, cssKey: 'flex-basis'): FlattenSimpleInterpolation;
  (flexedProp: FlexGrow, theme: ThemeInterface, cssKey: 'flex-grow'): FlattenSimpleInterpolation;
  (flexedProp: FlexOrder, theme: ThemeInterface, cssKey: 'order'): FlattenSimpleInterpolation;
  (flexedProp: FlexShrink, theme: ThemeInterface, cssKey: 'flex-shrink'): FlattenSimpleInterpolation;
}
