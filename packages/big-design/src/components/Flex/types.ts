import { CSSRules, ThemeInterface } from '@bigcommerce/big-design-theme';

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
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
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

export type TransientFlexedProps = Partial<{
  $alignContent: AlignContent;
  $alignItems: AlignItems;
  $flexColumnGap: FlexColumnGap;
  $flexDirection: FlexDirection;
  $flexGap: FlexGap;
  $flexRowGap: FlexRowGap;
  $flexWrap: FlexWrap;
  $justifyContent: JustifyContent;
}>;

export type FlexedItemProps = Partial<{
  alignSelf: AlignSelf;
  flexBasis: FlexBasis;
  flexGrow: FlexGrow;
  flexOrder: FlexOrder;
  flexShrink: FlexShrink;
}>;

// Internal, transient (`$`-prefixed) counterpart of `FlexedItemProps`. styled-components
// never forwards `$`-prefixed props to the DOM, so tag-target styled components read
// these instead of the public names to avoid leaking them onto real DOM nodes.
export type TransientFlexedItemProps = Partial<{
  $alignSelf: AlignSelf;
  $flexBasis: FlexBasis;
  $flexGrow: FlexGrow;
  $flexOrder: FlexOrder;
  $flexShrink: FlexShrink;
}>;

export interface FlexedOverload {
  (flexedProp: AlignContent, theme: ThemeInterface, cssKey: 'align-content'): CSSRules;
  (flexedProp: AlignItems, theme: ThemeInterface, cssKey: 'align-items'): CSSRules;
  (flexedProp: FlexColumnGap, theme: ThemeInterface, cssKey: 'column-gap'): CSSRules;
  (flexedProp: FlexDirection, theme: ThemeInterface, cssKey: 'flex-direction'): CSSRules;
  (flexedProp: FlexGap, theme: ThemeInterface, cssKey: 'gap'): CSSRules;
  (flexedProp: FlexRowGap, theme: ThemeInterface, cssKey: 'row-gap'): CSSRules;
  (flexedProp: FlexWrap, theme: ThemeInterface, cssKey: 'flex-wrap'): CSSRules;
  (flexedProp: JustifyContent, theme: ThemeInterface, cssKey: 'justify-content'): CSSRules;
  (flexedProp: AlignSelf, theme: ThemeInterface, cssKey: 'align-self'): CSSRules;
  (flexedProp: FlexBasis, theme: ThemeInterface, cssKey: 'flex-basis'): CSSRules;
  (flexedProp: FlexGrow, theme: ThemeInterface, cssKey: 'flex-grow'): CSSRules;
  (flexedProp: FlexOrder, theme: ThemeInterface, cssKey: 'order'): CSSRules;
  (flexedProp: FlexShrink, theme: ThemeInterface, cssKey: 'flex-shrink'): CSSRules;
}
