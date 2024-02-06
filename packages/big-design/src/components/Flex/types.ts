import { ThemeInterface } from '@bigcommerce/big-design-theme';
import { RuleSet } from 'styled-components';

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
  | 'normal'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'stretch'
>;

type AlignSelf = ResponsiveProp<
  | 'auto'
  | 'normal'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
>;

type FlexBasis = ResponsiveProp<
  'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string
>;

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
  (flexedProp: AlignContent, theme: ThemeInterface, cssKey: 'align-content'): RuleSet;
  (flexedProp: AlignItems, theme: ThemeInterface, cssKey: 'align-items'): RuleSet;
  (flexedProp: FlexColumnGap, theme: ThemeInterface, cssKey: 'column-gap'): RuleSet;
  (flexedProp: FlexDirection, theme: ThemeInterface, cssKey: 'flex-direction'): RuleSet;
  (flexedProp: FlexGap, theme: ThemeInterface, cssKey: 'gap'): RuleSet;
  (flexedProp: FlexRowGap, theme: ThemeInterface, cssKey: 'row-gap'): RuleSet;
  (flexedProp: FlexWrap, theme: ThemeInterface, cssKey: 'flex-wrap'): RuleSet;
  (flexedProp: JustifyContent, theme: ThemeInterface, cssKey: 'justify-content'): RuleSet;
  (flexedProp: AlignSelf, theme: ThemeInterface, cssKey: 'align-self'): RuleSet;
  (flexedProp: FlexBasis, theme: ThemeInterface, cssKey: 'flex-basis'): RuleSet;
  (flexedProp: FlexGrow, theme: ThemeInterface, cssKey: 'flex-grow'): RuleSet;
  (flexedProp: FlexOrder, theme: ThemeInterface, cssKey: 'order'): RuleSet;
  (flexedProp: FlexShrink, theme: ThemeInterface, cssKey: 'flex-shrink'): RuleSet;
}
