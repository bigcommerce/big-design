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
];

export const AlertPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Alert" propList={alertProps} {...props} />
);
