import { Small } from '@bigcommerce/big-design';
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
    name: 'autoDismiss',
    types: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        Auto dismiss after 5 seconds.
        {/* I hate using a br but the as prop doesn't support div for now */}
        {/* TODO: Support div for as prop */}
        <br />
        <Small as="span">Note: Only valid when used with AlertManager.</Small>
      </>
    ),
  },
];

export const AlertPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={alertProps} title="Alert" {...props} />
);
