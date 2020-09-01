import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const popoverProps: Prop[] = [
  {
    name: 'anchorElement',
    required: true,
    types: ['Element', 'null'],
    description: 'Element to be used as an anchor for the Popover.',
  },
  {
    name: 'isOpen',
    required: true,
    types: 'boolean',
    description: 'Specifies if the Popover is open or closed.',
  },
  {
    name: 'label',
    required: true,
    types: 'string',
    description: 'Label used for accessibility purposes, this label will be set as an aria-label on the popover.',
  },
  {
    name: 'closeOnClickOutside',
    types: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Determines if <Code>onClose</Code> gets called when clicking outside of the popover.
      </>
    ),
  },
  {
    name: 'closeOnEscKey',
    types: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Determines if <Code>onClose</Code> gets called when pressing the Esc key.
      </>
    ),
  },
  {
    name: 'matchAnchorElementWidth',
    types: 'boolean',
    defaultValue: 'false',
    description: 'If set to true, the Popover will have the same width as its anchor element.',
  },
  {
    name: 'skidding',
    types: 'number',
    defaultValue: '0',
    description: 'Determines the offset along the anchorElement.',
  },
  {
    name: 'offsetY',
    types: 'number',
    defaultValue: '4',
    description: 'Determines the offset away from the anchorElement.',
  },
  {
    name: 'onClose',
    types: '() => void',
    description: 'Callback that runs when the popover should close.',
  },
  {
    name: 'placement',
    defaultValue: 'auto',
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
    description: 'Sets the position of the Popover.',
  },
];

export const PopoverPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Popover" propList={popoverProps} {...props} />
);
