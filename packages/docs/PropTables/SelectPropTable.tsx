import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const selectProps: Prop[] = [
  { name: 'action', types: 'Action', description: 'Action item displayed at the end of the list.' },
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
    name: 'options',
    types: 'Array<DropdownItem | DropdownLinkItem>',
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
    name: 'onChange',
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
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your item's action is of normal or destructive nature.",
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Dropdown Item.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the item to disabled.',
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
    description: 'Stored value of the item.',
  },
];

export const SelectOptionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Option" propList={selectOptionProps} {...props} />
);

const selectActionProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your item's action is of normal or destructive nature.",
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Dropdown Item.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the item to disabled.',
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
    description: 'Returns the current inputText',
  },
];

export const SelectActionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Action" propList={selectActionProps} {...props} />
);
