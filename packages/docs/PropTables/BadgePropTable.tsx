import React from 'react';

import { type Prop, PropTable, type PropTableWrapper } from '../components';

const badgeProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    description: 'The text applied to the component.',
    required: true,
  },
  {
    name: 'variant',
    types: ['danger', 'secondary', 'success', 'warning', 'primary', 'primary-subtle'],
    description: 'Determines which badge to display.',
    defaultValue: 'secondary',
  },
  {
    name: 'size',
    types: ['small', 'normal'],
    description:
      'Determines the size of the badge. Small renders a 28 x 16px badge with 10px text.',
    defaultValue: 'normal',
  },
];

export const BadgePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={badgeProps} title="Badge" {...props} />
);
