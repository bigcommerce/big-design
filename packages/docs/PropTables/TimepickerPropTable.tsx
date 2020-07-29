import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const timepickerProps: Prop[] = [
  {
    name: 'onTimeChange',
    types: '(value: string) => void',
    required: true,
    description: 'Callback called with value of selected time.',
  },
  {
    name: 'label',
    types: 'string',
    description: 'Adds a label to the field.',
  },
  {
    name: 'value',
    types: 'string',
    description: 'The time that should be used as the input value in hh:mm am/pm format.',
  },
];

export const TimepickerPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Timepicker" propList={timepickerProps} {...props} />
);
