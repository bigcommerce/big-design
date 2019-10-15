import React from 'react';

import { Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'percent',
    types: 'number',
    description: 'Sets the fill length from 0 to 100.',
  },
];

export const ProgressBarPropTable: React.FC = () => <PropTable propList={props} />;
