import React from 'react';

import { Code, PropTable } from '../../components';

export const GridPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="areas" types="string">
      Defines a grid template by referencing the names of the grid areas which are specified with the grid-area property
      of a grid item. Same as the <Code highlight={false}>grid-template-areas</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="autoColumns" types="string">
      Specifies the size of any auto-generated column grid tracks. Same as the{' '}
      <Code highlight={false}>grid-auto-columns</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop
      name="autoFlow"
      types={['row', 'column', 'dense', 'row dense', 'column dense', 'inherit', 'initial', 'unset']}
    >
      Controls how auto placement of grid items work. Same as the <Code highlight={false}>grid-auto-flow</Code> CSS
      property.
    </PropTable.Prop>
    <PropTable.Prop name="autoRows" types="string">
      Specifies the size of any auto-generated row grid tracks. Same as the{' '}
      <Code highlight={false}>grid-auto-rows</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="columns" types="string">
      Defines the columns of the grid with a space-separated list of values. Same as the{' '}
      <Code highlight={false}>grid-template-columns</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="gap" types="string">
      Controls the spacing between grid items. Same as the <Code highlight={false}>grid-gap</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="rows" types="string">
      Defines the rows of the grid with a space-separated list of values. Same as the{' '}
      <Code highlight={false}>grid-template-rows</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="template" types="string">
      Shorthand for <Code highlight={false}>grid-template-columns</Code>,{' '}
      <Code highlight={false}>grid-template-rows</Code>, and <Code highlight={false}>grid-template-areas</Code>. Same as
      the <Code highlight={false}>grid-template</Code> CSS property.
    </PropTable.Prop>
  </PropTable>
);

export const GridItemPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="area" types="string">
      Gives a grid item and area defined via <Code highlight={false}>grid-template-areas</Code>. Same as the{' '}
      <Code highlight={false}>grid-area</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="column" types="string">
      Shorthand for <Code highlight={false}>grid-column-start</Code> and <Code highlight={false}>grid-column-end</Code>.
      Same as the <Code highlight={false}>grid-column</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="columnEnd" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-column-end</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="columnStart" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-column-start</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="row" types="string">
      Shorthand for <Code highlight={false}>grid-row-start</Code> and <Code highlight={false}>grid-row-end</Code>. Same
      as the <Code highlight={false}>grid-row</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="rowEnd" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-row-end</Code> CSS property.
    </PropTable.Prop>
    <PropTable.Prop name="rowStart" types="string">
      Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
      <Code highlight={false}>grid-row-start</Code> CSS property.
    </PropTable.Prop>
  </PropTable>
);
