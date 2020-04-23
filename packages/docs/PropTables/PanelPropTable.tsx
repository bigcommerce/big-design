import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const panelProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: 'Defines the panel header text.',
  },
  {
    name: 'action',
    types: 'ButtonProps &amp; { text: string }',
    description: 'Defines the panel action button.',
  },
];

export const PanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Panel" propList={panelProps} {...props} />
);
