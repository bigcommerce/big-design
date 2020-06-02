import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const datepickerProps: Prop[] = [
  {
    name: 'onChange',
    types: '(date: Date) => void',
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
    types: 'Date',
    description: 'Selected date for the calendar.',
  },
  {
    name: 'maxDate',
    types: 'Date',
    description: 'Maximum date that can selected in the calendar.',
  },
  {
    name: 'minDate',
    types: 'Date',
    description: 'Minimum date that can selected in the calendar.',
  },
  {
    name: 'dateFormat',
    types: 'string',
    defaultValue: 'EE, dd MMM, yyyy',
    description: 'Format for selected date to be displayed in input.',
  },
  {
    name: 'filterDate',
    types: '(date: Date) => boolean',
    description: 'Only dates that pass the function condition can be selected.',
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
