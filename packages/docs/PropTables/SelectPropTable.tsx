import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const selectProps: Prop[] = [
  {
    name: 'error',
    types: 'ReactChild',
    description: 'Displays a form error around the field.',
  },
  {
    name: 'label',
    types: 'ReactChild',
    description: 'Adds a label to the field.',
  },
  {
    name: 'maxHeight',
    types: 'number',
    defaultValue: '250',
    description: (
      <>
        Sets a <Code>max-height</Code> to the dropdown.
      </>
    ),
  },
  {
    name: 'placement',
    types: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],
    defaultValue: 'bottom-start',
    description: 'Determines the location in which the dropdown will be placed.',
  },
  {
    name: 'positionFixed',
    defaultValue: 'false',
    types: 'boolean',
    description: (
      <>
        If set, uses <Code>position: fixed</Code> instead of <Code>position: absolute</Code> to position the items.
      </>
    ),
  },
  {
    name: 'required',
    types: 'boolean',
    description: 'Sets the field as required.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Disables the select component.',
  },
  {
    name: 'value',
    types: 'string | string[] | number',
    description: 'Modifies the current selected value of the field.',
  },
  {
    name: 'multi',
    types: 'boolean',
    description: 'Renders a multiselect component.',
  },
  {
    name: 'onActionClick',
    types: '(string) => void',
    description: 'Callback called with the typed text of the field.',
  },
  {
    name: 'onItemChange',
    types: '(value) => void',
    required: true,
    description: 'Callback called with value of clicked item.',
  },
];

export const SelectPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Select" propList={selectProps} {...props} />
);

const selectOptionProps: Prop[] = [
  {
    name: 'value',
    types: 'string | string[] | number',
    description: 'Value of the option',
  },
];

export const SelectOptionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Select.Option" propList={selectOptionProps} {...props} />
);
