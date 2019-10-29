import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const selectProps: Prop[] = [
  { name: 'action', types: 'Action', description: 'Action option displayed at the end of the list.' },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Disables the select component.',
  },
  {
    name: 'error',
    types: 'string',
    description: 'Displays a form error around the field.',
  },
  {
    name: 'label',
    types: 'string',
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
    name: 'multi',
    types: 'boolean',
    description: 'Renders a multiselect component.',
  },
  {
    name: 'options',
    types: 'Array<Options>',
    required: true,
    description: (
      <>
        Accepts an array of <Code>Options</Code>. See example for usage.
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
    name: 'value',
    types: 'string | number | Array<string | number>',
    description: (
      <>
        Modifies the current selected value of the field. If rendering a <Code>multiselect</Code> component,{' '}
        <Code>value</Code> expects an array.
      </>
    ),
  },

  {
    name: 'onChange',
    types: '(value: string | number | Array<string | number>) => void',
    required: true,
    description: 'Callback called with value of selected option.',
  },
];

const selectOptionProps: Prop[] = [
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the Option to disabled.',
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Option.',
  },
  {
    name: 'icon',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'value',
    types: 'string | number | Array<string | number>',
    required: true,
    description: 'Stored value of the Option.',
  },
];

const selectActionProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: 'Indicates whether the Action is of normal or destructive nature.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the Action to disabled.',
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Action.',
  },
  {
    name: 'icon',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'onClick',
    types: '(inputText: string): void',
    description: 'Returns the current text in the input.',
  },
];

export const SelectPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Select" propList={selectProps} {...props} />
);

export const SelectOptionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Select[Option]" propList={selectOptionProps} {...props} />
);

export const SelectActionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Select[Action]" propList={selectActionProps} {...props} />
);
