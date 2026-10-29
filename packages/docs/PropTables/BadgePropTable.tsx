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
    types: ['danger', 'secondary', 'success', 'warning', 'primary'],
    description: 'Determines which badge to display.',
    defaultValue: 'secondary',
  },
  {
    name: 'subtle',
    types: 'boolean',
    description:
      'Renders a lighter background with darker text. Currently only supported by the primary variant.',
    defaultValue: 'false',
  },
  {
    name: 'size',
    types: ['small', 'medium'],
    description:
      'Determines the size of the badge. Small renders a badge with 10px text and a 16px line height.',
    defaultValue: 'medium',
  },
];

export const BadgePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={badgeProps} title="Badge" {...props} />
);
