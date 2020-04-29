import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const collapseProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'Collapse title.',
    required: true,
  },
  {
    name: 'initiallyOpen',
    types: 'boolean',
    description: 'Defines if panel with content is visible by default.',
    required: false,
  },
  {
    name: 'onCollapseChange',
    types: '(isOpen: boolean) => void',
    description: 'Function that will be called when a title is clicked.',
    required: false,
  },
];

export const CollapsePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Collapse" propList={collapseProps} {...props} />
);
