import { Responsive } from '../../types';

type SingleAlignContent =
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
  | 'stretch';
type ResponsiveAlignContent = Responsive<SingleAlignContent>;
export type AlignContent = SingleAlignContent | ResponsiveAlignContent;

type SingleAlignItems =
  | 'normal'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'stretch';
type ResponsiveAlignItems = Responsive<SingleAlignItems>;
export type AlignItems = SingleAlignItems | ResponsiveAlignItems;

type SingleAlignSelf =
  | 'auto'
  | 'normal'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';
type ResponsiveAlignSelf = Responsive<SingleAlignSelf>;
export type AlignSelf = SingleAlignSelf | ResponsiveAlignSelf;

type SingleFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type ResponsiveFlexDirection = Responsive<SingleFlexDirection>;
export type FlexDirection = SingleFlexDirection | ResponsiveFlexDirection;

type SingleFlexWrap = 'nowrap' | 'wrap' | 'wrap-reversed';
type ResponsiveFlexWrap = Responsive<SingleFlexWrap>;
export type FlexWrap = SingleFlexWrap | ResponsiveFlexWrap;

type SingleJustifyContent =
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
  | 'stretch';
type ResponsiveJustifyContent = Responsive<SingleJustifyContent>;
export type JustifyContent = SingleJustifyContent | ResponsiveJustifyContent;

type SingleFlexBasis = 'auto' | 'fill' | 'min-content' | 'max-content' | 'fit-content' | 'content' | string;
type ResponsiveFlexBasis = Responsive<SingleFlexBasis>;
export type FlexBasis = SingleFlexBasis | ResponsiveFlexBasis;

type SingleFlexGrow = number;
type ResponsiveFlexGrow = Responsive<SingleFlexGrow>;
export type FlexGrow = SingleFlexGrow | ResponsiveFlexGrow;

type SingleOrder = number;
type ResponsiveOrder = Responsive<SingleOrder>;
export type Order = SingleOrder | ResponsiveOrder;

type SingleFlexShrink = number;
type ResponsiveFlexShrink = Responsive<SingleFlexShrink>;
export type FlexShrink = SingleFlexShrink | ResponsiveFlexShrink;
