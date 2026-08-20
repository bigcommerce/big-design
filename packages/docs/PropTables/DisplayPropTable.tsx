import React from 'react';

import { type Prop, PropTable, type PropTableWrapper } from '../components';

const displayProps: Prop[] = [
  {
    name: 'display',
    types: [
      'block',
      'inline-block',
      'inline',
      'inline-flex',
      'flex',
      'grid',
      'inline-grid',
      'none',
    ],
    description: 'Sets the CSS display property of a component.',
  },
];

export const DisplayPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={displayProps} title="Display" {...props} />
);
