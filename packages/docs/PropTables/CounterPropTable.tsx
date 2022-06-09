import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const counterProps: Prop[] = [
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: (
      <>
        Label element for <Code primary>Counters</Code>. Component will auto generate{' '}
        <Code>id</Code>'s for the accessibility API.
      </>
    ),
  },
  {
    name: 'labelId',
    types: 'string',
    description: (
      <>
        Appends an <Code>id</Code> to the generated label element.
      </>
    ),
  },
  {
    name: 'description',
    types: ['string', 'FormControlDescription'],
    description: 'Append a description to the input field.',
  },
  {
    name: 'error',
    types: ['string', 'string[]', 'FormControlError', 'FormControlError[]'],
    description: (
      <>
        Displays an error message for the field. Error message will be passed to the{' '}
        <Code>FormGroup</Code> for display purposes.
      </>
    ),
  },
  {
    name: 'value',
    types: 'number',
    required: true,
    description: (
      <>
        Value for the <Code>Counter</Code>. Only accepts whole numbers.
      </>
    ),
  },
  {
    name: 'min',
    types: 'number',
    defaultValue: 0,
    description: (
      <>
        The minimum <Code>value</Code> allowed.
      </>
    ),
  },
  {
    name: 'max',
    types: 'number',
    defaultValue: 100,
    description: (
      <>
        The maximum <Code>value</Code> allowed.
      </>
    ),
  },
  {
    name: 'step',
    types: 'number',
    defaultValue: 1,
    description: (
      <>
        The amount beetween one <Code>value</Code> and the next when incrementing or decrementing
        the <Code>Counter</Code>.
      </>
    ),
  },
  {
    name: 'onCountChange',
    types: '(count: number) => void',
    description:
      'Function to be called that changes counter value. Receives the new count from the component.',
    required: true,
  },
];

export const CounterPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['input', 'most']} propList={counterProps} title="Counter" {...props} />
);
