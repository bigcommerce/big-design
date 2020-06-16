import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const datepickerProps: Prop[] = [
  {
    name: 'onDateChange',
    types: '(date: string) => void',
    required: true,
    description: 'Callback called with value of selected date.',
  },
  {
    name: 'label',
    types: 'string',
    description: 'Adds a label to the field.',
  },
  {
    name: 'selected',
    types: 'string',
    description: 'The ISO time that should be used as the input value.',
  },
  {
    name: 'maxDate',
    types: 'string',
    description: 'Maximum date in ISO format that can selected in the calendar.',
  },
  {
    name: 'minDate',
    types: 'string',
    description: 'Minimum date in ISO format that can selected in the calendar.',
  },
  {
    name: 'dateFormat',
    types: 'string',
    defaultValue: 'EE, dd MMM, yyyy',
    description: 'Format for selected date to be displayed in input.',
  },
  {
    name: 'locale',
    types: 'string',
    description: 'Sets the locale for the calendar.',
  },
];

export const DatepickerPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Datepicker" propList={datepickerProps} {...props} />
);
