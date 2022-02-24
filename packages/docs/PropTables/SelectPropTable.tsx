import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const selectProps: Prop[] = [
  {
    name: 'action',
    types: 'SelectAction',
    description: 'Action option displayed at the end of the list.',
  },
  {
    name: 'autoComplete',
    defaultValue: 'off',
    types: 'string',
    description: 'Set the autoComplete property for the input.',
  },
  {
    name: 'description',
    types: 'string | FormControlDescription',
    description: 'Append a description to the select field.',
  },
  {
    name: 'disabled',
    defaultValue: 'false',
    types: 'boolean',
    description: (
      <>
        Disables the <Code primary>Select</Code> component.
      </>
    ),
  },
  {
    name: 'error',
    types: 'string',
    description: 'Displays a form error around the field.',
  },
  {
    name: 'filterable',
    types: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Allows you to filter the <Code>SelectOptions</Code> in the <Code primary>Select</Code>.
      </>
    ),
  },
  {
    name: 'inputRef',
    types: 'React.Ref<HTMLInputElement> | React.RefObject<HTMLInputElement>',
    description: (
      <>
        The provided ref will be used for the underlying input element used in the <Code primary>Select</Code>.
      </>
    ),
  },
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: 'Adds a label to the field.',
  },
  {
    name: 'labelId',
    types: 'string',
    description: 'Adds a custom id to the label.',
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
    name: 'onClose',
    types: '() => void',
    description: (
      <>
        Function that will be called when the <Code primary>Select</Code> is closed.
      </>
    ),
  },
  {
    name: 'onOpen',
    types: '() => void',
    description: (
      <>
        Function that will be called when the <Code primary>Select</Code> is opened.
      </>
    ),
  },
  {
    name: 'onOptionChange',
    types: '(value: any, option: SelectOption) => void',
    required: true,
    description: 'Callback called with value of selected option.',
  },
  {
    name: 'options',
    types: 'Array<SelectOption> | Array<SelectOptionGroup>',
    required: true,
    description: (
      <>
        Accepts an array of <Code>SelectOptions</Code> or an array of <Code>SelectOptionGroups</Code>. See{' '}
        <NextLink href={{ hash: 'implementation' }}>implementation</NextLink> section for usage.
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
        If set, uses <Code>position: fixed</Code> instead of <Code>position: absolute</Code> to position the list.
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
    types: 'any ',
    description: <>Modifies the current selected value of the field.</>,
  },
];

const selectOptionProps: Prop[] = [
  {
    name: 'disabled',
    defaultValue: 'false',
    types: 'boolean',
    description: (
      <>
        Sets the <Code>SelectOption</Code> to disabled.
      </>
    ),
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: (
      <>
        Sets the text content of the <Code>SelectOption</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: 'string',
    description: (
      <>
        Sets the content description of the <Code>SelectOption</Code>.
      </>
    ),
  },
  {
    name: 'tooltip',
    types: 'string',
    description: <>Adds tooltip for disabled item.</>,
  },
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the left of the text. Only available
        for single select.
      </>
    ),
  },
  {
    name: 'value',
    types: 'any',
    required: true,
    description: (
      <>
        Stored value of the <Code>SelectOption</Code>.
      </>
    ),
  },
];

const selectActionProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: (
      <>
        Indicates whether the <Code>SelectAction</Code> is of normal or destructive nature.
      </>
    ),
  },
  {
    name: 'disabled',
    defaultValue: 'false',
    types: 'boolean',
    description: (
      <>
        Sets the <Code>SelectAction</Code> to disabled.
      </>
    ),
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: (
      <>
        Sets the text content of the <Code>SelectAction</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: 'string',
    description: (
      <>
        Sets the content description of the <Code>SelectAction</Code>.
      </>
    ),
  },
  {
    name: 'tooltip',
    types: 'string',
    description: <>Adds tooltip for disabled item.</>,
  },
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'onClick',
    types: '(inputText: string): void',
    description: 'Returns the current text in the input.',
  },
];

const selectGroupProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    required: true,
    description: <>Adds a label to the option group.</>,
  },
  {
    name: 'separated',
    types: 'boolean',
    description: 'If true, adds a line separator above the group.',
  },
  {
    name: 'options',
    types: 'Array<SelectOption>',
    required: true,
    description: (
      <>
        Accepts an array of <Code>SelectOption</Code>. See{' '}
        <NextLink href={{ query: 'implementation=select-group' }}>example</NextLink> for usage.
      </>
    ),
  },
];

export const SelectPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Select" propList={selectProps} {...props} />
);

export const SelectOptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Select[SelectOption]" propList={selectOptionProps} {...props} />
);

export const SelectActionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Select[SelectAction]" propList={selectActionProps} {...props} />
);

export const SelectGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Select[SelectGroup]" propList={selectGroupProps} {...props} />
);
