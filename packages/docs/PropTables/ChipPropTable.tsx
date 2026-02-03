import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const chipProps: Prop[] = [
  {
    name: 'label',
    types: 'string',
    description: 'The text displayed in the chip.',
    required: true,
  },
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display at the start of the
        chip.
      </>
    ),
  },
  {
    name: 'onDelete',
    types: '() => void',
    description:
      'Callback when the remove button is clicked. When provided, a remove button is shown.',
  },
];

export const ChipPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={chipProps} title="Chip" {...props} />
);
