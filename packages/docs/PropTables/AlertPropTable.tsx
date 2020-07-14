import { Small, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

const alertProps: Prop[] = [
  ...sharedMessagingProps,
  {
    name: 'key',
    types: 'string',
    description: 'Key used to identify alert.',
  },
  {
    name: 'fadeAway',
    types: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        <Text>Autoclose after 5 seconds.</Text>
        <Small>Note: Only valid when used with AlertManager.</Small>
      </>
    ),
  },
];

export const AlertPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Alert" propList={alertProps} {...props} />
);
