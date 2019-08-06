import React from 'react';

import { Code, PropTable } from '../components';

export const GridPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="gridAreas" types="string">
      Defines a grid template by referencing the names of the grid areas which are specified with the grid-area property
      of a grid item. Same as the <Code highlight={false}>grid-template-areas</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridAutoColumns" types="string">
      Specifies the size of any auto-generated column grid tracks. Same as the{' '}
      <Code highlight={false}>grid-auto-columns</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop
      name="gridAutoFlow"
      types={['row', 'column', 'dense', 'row dense', 'column dense', 'inherit', 'initial', 'unset']}
    >
      Controls how auto placement of grid items work. Same as the <Code highlight={false}>grid-auto-flow</Code> CSS
      property.
    </PropTable.Prop>
    <PropTable.Prop name="gridAutoRows" types="string">
      Specifies the size of any auto-generated row grid tracks. Same as the{' '}
      <Code highlight={false}>grid-auto-rows</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridColumns" types="string">
      Defines the columns of the grid with a space-separated list of values. Same as the{' '}
      <Code highlight={false}>grid-template-columns</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridGap" types="string">
      Controls the spacing between grid items. Same as the <Code highlight={false}>grid-gap</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridRows" types="string">
      Defines the rows of the grid with a space-separated list of values. Same as the{' '}
      <Code highlight={false}>grid-template-rows</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridTemplate" types="string">
      Shorthand for <Code highlight={false}>grid-template-columns</Code>,{' '}
      <Code highlight={false}>grid-template-rows</Code>, and <Code highlight={false}>grid-template-areas</Code>. Same as
      the <Code highlight={false}>grid-template</Code> CSS property.
    </PropTable.Prop>
  </PropTable>
);

export const GridItemPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="gridArea" types="string">
      Gives a grid item and area defined via <Code highlight={false}>grid-template-areas</Code>. Same as the{' '}
      <Code highlight={false}>grid-area</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridColumn" types="string">
      Shorthand for <Code highlight={false}>grid-column-start</Code> and <Code highlight={false}>grid-column-end</Code>.
      Same as the <Code highlight={false}>grid-column</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridColumnEnd" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-column-end</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridColumnStart" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-column-start</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridRow" types="string">
      Shorthand for <Code highlight={false}>grid-row-start</Code> and <Code highlight={false}>grid-row-end</Code>. Same
      as the <Code highlight={false}>grid-row</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridRowEnd" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-row-end</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gridRowStart" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-row-start</Code> CSS property.
    </PropTable.Prop>
  </PropTable>
);
