import { Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

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
    name: 'value',
    types: 'string',
    description: 'The ISO time that should be used as the input value.',
  },
  {
    name: 'max',
    types: 'string',
    description: 'Maximum date in ISO format that can selected in the calendar.',
  },
  {
    name: 'min',
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
    defaultValue: 'en-US',
    description: (
      <>
        Locale used to format the the date and calendar. See{' '}
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat"
          target="_blank"
        >
          DateTimeFormat
        </Link>
      </>
    ),
  },
];

export const DatepickerPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Datepicker" propList={datepickerProps} {...props}>
    <Text>
      Supports all native <Code>&lt;input [type="date"] /&gt;</Code> element attributes.
    </Text>
  </PropTable>
);
