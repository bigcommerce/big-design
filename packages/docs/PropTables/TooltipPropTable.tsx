import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const tooltipProps: Prop[] = [
  {
    name: 'trigger',
    types: 'ReactNode',
    required: true,
    description: 'React Node that triggers the tooltip on hover.',
  },
  {
    name: 'placement',
    defaultValue: 'top',
    types: [
      'auto',
      'auto-end',
      'auto-start',
      'bottom',
      'bottom-end',
      'bottom-start',
      'left',
      'left-end',
      'left-start',
      'right',
      'right-end',
      'right-start',
      'top',
      'top-end',
      'top-start',
    ],
    description: 'Sets the position of the Tooltip.',
  },
];

export const TooltipPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Tooltip" propList={tooltipProps} {...props} />
);
