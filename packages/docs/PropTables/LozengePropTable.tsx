import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const lozengeProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    description: 'Text rendered inside the lozenge.',
    required: true,
  },
  {
    name: 'variant',
    types: ['alpha', 'beta', 'deprecated', 'early-access', 'legacy', 'new'],
    description: 'Lifecycle status the lozenge represents.',
    defaultValue: 'new',
  },
  {
    name: 'tooltipContent',
    types: 'string',
    description:
      'Adds an info icon and shows this message in a tooltip on hover/focus (tooltip mode).',
  },
  {
    name: 'onClick',
    types: '() => void',
    description:
      'Click handler for popover mode. Provide together with `isOpen` to use the lozenge as a popover trigger.',
  },
  {
    name: 'isOpen',
    types: 'boolean',
    description:
      'Controls the open state in popover mode (sets `aria-expanded` and caret visual state).',
  },
];

export const LozengePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={lozengeProps} title="Lozenge" {...props} />
);
