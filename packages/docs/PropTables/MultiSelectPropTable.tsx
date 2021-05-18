import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

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
        Disables the <Code>MultiSelect</Code> component.
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
        Allows you to filter the <Code>SelectOptions</Code> in the <Code>Select</Code>.
      </>
    ),
  },
  {
    name: 'inputRef',
    types: 'React.Ref<HTMLInputElement> | React.RefObject<HTMLInputElement>',
    description: (
      <>
        The provided ref will be used for the underlying input element used in the <Code>Select</Code>.
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
    name: 'onOptionsChange',
    types: '(value: [any], option: [SelectOption]) => void',
    required: true,
    description: 'Callback called with value of selected option.',
  },
  {
    name: 'options',
    types: 'Array<SelectOption> | Array<SelectOptionGroup>',
    required: true,
    description: (
      <>
        Accepts an array of <Code>SelectOption</Code> or an array of <Code>SelectOptionGroups</Code>. See example for
        usage.
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
    types: '[any]',
    description: <>Modifies the current selected value of the field.</>,
  },
];

export const MultiSelectPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="MultiSelect" propList={selectProps} {...props} />
);
