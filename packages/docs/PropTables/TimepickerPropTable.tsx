import { Link } from '@bigcommerce/big-design';
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
  {
    name: 'value',
    types: 'string',
    description: 'The time that should be used as the input value.',
  },
];

export const TimepickerPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Timepicker" propList={timepickerProps} {...props} />
);
