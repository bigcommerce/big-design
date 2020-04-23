import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const badgeProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    description: 'The text applied to the component.',
    required: true,
  },
  {
    name: 'variant',
    types: ['danger', 'secondary', 'success', 'warning'],
    description: 'Determines which badge to display.',
    defaultValue: 'secondary',
  },
];

export const BadgePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Badge" propList={badgeProps} {...props} />
);
