import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const accordionProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'Accordion title.',
    required: true,
  },
  {
    name: 'initiallyOpen',
    types: 'boolean',
    description: 'Defines if panel with content is visible by default.',
    required: false,
  },
  {
    name: 'onChange',
    types: '(isOpen: boolean) => void',
    description: 'Function that will be called when a title is clicked.',
    required: false,
  },
];

export const AccordionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Accordion" propList={accordionProps} {...props} />
);
