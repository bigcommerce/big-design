import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const tooltipProps: Prop[] = [
  {
    name: 'trigger',
    types: 'ReactElement',
    required: true,
    description: 'React Element that triggers the tooltip on hover.',
  },
  {
    name: 'placement',
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
    defaultValue: 'auto',
    description:
      'Sets the preferred position of the Tooltip. Explicit placements flip to the opposite side when there is not enough space. Auto placements pick whichever side has the most available space.',
  },
  {
    name: 'middleware',
    types: 'Middleware[]',
    description:
      'Floating UI middleware to customize positioning. Replaces the default middleware stack (offset(4), flip/autoPlacement, shift). Import middleware from @floating-ui/react.',
  },
];

export const TooltipPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tooltipProps} title="Tooltip" {...props} />
);
