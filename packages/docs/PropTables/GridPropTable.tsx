import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const gridProps: Prop[] = [
  {
    name: 'gridAreas',
    types: 'string',
    description: (
      <>
        Defines a grid template by referencing the names of the grid areas which are specified with the grid-area
        property of a grid item. Same as the <Code highlight={false}>grid-template-areas</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridAutoColumns',
    types: 'string',
    description: (
      <>
        Specifies the size of any auto-generated column grid tracks. Same as the{' '}
        <Code highlight={false}>grid-auto-columns</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridAutoFlow',
    types: ['row', 'column', 'dense', 'row dense', 'column dense', 'inherit', 'initial', 'unset'],
    description: (
      <>
        Controls how auto placement of grid items work. Same as the <Code highlight={false}>grid-auto-flow</Code> CSS
        property.
      </>
    ),
  },
  {
    name: 'gridAutoRows',
    types: 'string',
    description: (
      <>
        Specifies the size of any auto-generated row grid tracks. Same as the{' '}
        <Code highlight={false}>grid-auto-rows</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridColumns',
    types: 'string',
    description: (
      <>
        Defines the columns of the grid with a space-separated list of values. Same as the{' '}
        <Code highlight={false}>grid-template-columns</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridGap',
    types: 'string',
    description: (
      <>
        Controls the spacing between grid items. Same as the <Code highlight={false}>grid-gap</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridRows',
    types: 'string',
    description: (
      <>
        Defines the rows of the grid with a space-separated list of values. Same as the{' '}
        <Code highlight={false}>grid-template-rows</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridTemplate',
    types: 'string',
    description: (
      <>
        Shorthand for <Code highlight={false}>grid-template-columns</Code>,{' '}
        <Code highlight={false}>grid-template-rows</Code>, and <Code highlight={false}>grid-template-areas</Code>. Same
        as the <Code highlight={false}>grid-template</Code> CSS property.
      </>
    ),
  },
];

export const GridPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Grid" propList={gridProps} {...props} />
);

const gridItemProps: Prop[] = [
  {
    name: 'gridArea',
    types: 'string',
    description: (
      <>
        Gives a grid item and area defined via <Code highlight={false}>grid-template-areas</Code>. Same as the{' '}
        <Code highlight={false}>grid-area</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridColumn',
    types: 'string',
    description: (
      <>
        Shorthand for <Code highlight={false}>grid-column-start</Code> and{' '}
        <Code highlight={false}>grid-column-end</Code>. Same as the <Code highlight={false}>grid-column</Code> CSS
        property.
      </>
    ),
  },
  {
    name: 'gridColumnEnd',
    types: 'string',
    description: (
      <>
        Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
        <Code highlight={false}>grid-column-end</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridColumnStart',
    types: 'string',
    description: (
      <>
        Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
        <Code highlight={false}>grid-column-start</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridRow',
    types: 'string',
    description: (
      <>
        Shorthand for <Code highlight={false}>grid-row-start</Code> and <Code highlight={false}>grid-row-end</Code>.
        Same as the <Code highlight={false}>grid-row</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridRowEnd',
    types: 'string',
    description: (
      <>
        Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
        <Code highlight={false}>grid-row-end</Code> CSS property.
      </>
    ),
  },
  {
    name: 'gridRowStart',
    types: 'string',
    description: (
      <>
        Determines a grid item's location within the grid by referring to specific grid lines. Same as the{' '}
        <Code highlight={false}>grid-row-start</Code> CSS property.
      </>
    ),
  },
];

export const GridItemPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Grid.Item" propList={gridItemProps} {...props} />
);
