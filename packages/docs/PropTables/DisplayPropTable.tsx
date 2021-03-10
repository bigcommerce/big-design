import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const displayProps: Prop[] = [
  {
    name: 'display',
    types: ['block', 'inline-block', 'inline', 'inline-flex', 'flex', 'grid', 'inline-grid', 'table-cell', 'none'],
    description: 'Sets the CSS display property of a component.',
  },
];

export const DisplayPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Display" propList={displayProps} {...props} />
);
