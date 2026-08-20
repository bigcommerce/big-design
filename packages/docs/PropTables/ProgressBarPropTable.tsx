import React from 'react';

import { type Prop, PropTable, type PropTableWrapper } from '../components';

const progressBarProps: Prop[] = [
  {
    name: 'percent',
    types: 'number',
    description: 'Sets the fill length from 0 to 100.',
  },
];

export const ProgressBarPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={progressBarProps} title="ProgressBar" {...props} />
);
