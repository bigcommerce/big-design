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

type FlexDirection = ResponsiveProp<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

type FlexWrap = ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reversed'>;

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

type FlexBasis = ResponsiveProp<'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string>;

type FlexGrow = ResponsiveProp<number>;

type FlexOrder = ResponsiveProp<number>;

type FlexShrink = ResponsiveProp<number>;

export type FlexedProps = Partial<{
  alignContent: AlignContent;
  alignItems: AlignItems;
  flexDirection: FlexDirection;
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
  (flexedProp: FlexDirection, theme: ThemeInterface, cssKey: 'flex-direction'): FlattenSimpleInterpolation;
  (flexedProp: FlexWrap, theme: ThemeInterface, cssKey: 'flex-wrap'): FlattenSimpleInterpolation;
  (flexedProp: JustifyContent, theme: ThemeInterface, cssKey: 'justify-content'): FlattenSimpleInterpolation;
  (flexedProp: AlignSelf, theme: ThemeInterface, cssKey: 'align-self'): FlattenSimpleInterpolation;
  (flexedProp: FlexBasis, theme: ThemeInterface, cssKey: 'flex-basis'): FlattenSimpleInterpolation;
  (flexedProp: FlexGrow, theme: ThemeInterface, cssKey: 'flex-grow'): FlattenSimpleInterpolation;
  (flexedProp: FlexOrder, theme: ThemeInterface, cssKey: 'order'): FlattenSimpleInterpolation;
  (flexedProp: FlexShrink, theme: ThemeInterface, cssKey: 'flex-shrink'): FlattenSimpleInterpolation;
}
