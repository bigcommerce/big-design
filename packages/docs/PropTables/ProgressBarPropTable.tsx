import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const progressBarProps: Prop[] = [
  {
    name: 'percent',
    types: 'number',
    description: 'Sets the fill length from 0 to 100.',
  },
];

export const ProgressBarPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="ProgressBar" propList={progressBarProps} {...props} />
);
