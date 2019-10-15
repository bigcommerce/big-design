import React from 'react';

import { Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'variant',
    types: ['danger', 'secondary', 'success', 'warning'],
    description: 'Determines which badge to display.',
    defaultValue: 'secondary',
  },
];

export const BadgePropTable: React.FC = () => <PropTable propList={props} />;
