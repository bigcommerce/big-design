import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const lozengeProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    description: 'The text applied to the component.',
    required: true,
  },
  {
    name: 'tooltipContent',
    types: 'string',
    description: 'Defines the message of an optional tooltip.',
  },
  {
    name: 'variant',
    types: ['alpha', 'beta', 'deprecated', 'legacy', 'new'],
    description: 'Determines which badge to display.',
    defaultValue: 'new',
  },
];

export const LozengePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={lozengeProps} title="Badge" {...props} />
);
