import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const toggleProps: Prop[] = [
  {
    name: 'id',
    types: 'string',
    description: 'Defines an HTML id attribute to the parent wrapper.',
  },
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: 'Adds a label to the toggle.',
  },
  {
    name: 'value',
    types: 'any',
    description: 'Determines the active button by value.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: (
      <>
        Disables the <Code>Toggle</Code> component.
      </>
    ),
  },
  {
    name: 'items',
    types: 'ToggleItem[]',
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'toggle-item-prop-table', query: { props: 'toggle-item' } }}>
          ToggleItem
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
  {
    name: 'onChange',
    types: '(value: string) => void',
    description: 'Function that will get called when a toggle button is clicked.',
  },
];

export const TogglePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={toggleProps} title="Toggle" {...props} />
);

const toggleItemProps: Prop[] = [
  {
    name: 'value',
    types: 'any',
    description: 'Toggle button value, must be unique.',
    required: true,
  },
  {
    name: 'label',
    types: 'string',
    description: "Toggle button label, can't be used with icon.",
  },
  {
    name: 'icon',
    types: 'React.ReactNode',
    description: "Toggle button icon, can't be used with title.",
  },
];

export const ToggleItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={toggleItemProps} title="Toggle[ToggleItem]" {...props} />
);
