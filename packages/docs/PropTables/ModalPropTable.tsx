import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const modalProps: Prop[] = [
  {
    name: 'actions',
    types: 'object[]',
    description: (
      <>
        Accepts an array of objects with <NextLink href="/button">Button</NextLink> props and an
        additional <Code>text</Code> prop. See example for usage.
      </>
    ),
  },
  {
    name: 'backdrop',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Determines if the backdrop is shown.',
  },
  {
    name: 'closeOnClickOutside',
    types: 'boolean',
    defaultValue: 'false',
    description: (
      <>
        Controls whether <Code>onClose</Code> is called when clicking outside of the modal.
      </>
    ),
  },
  {
    name: 'closeOnEscKey',
    types: 'boolean',
    defaultValue: 'true',
    description: (
      <>
        Controls whether <Code>onClose</Code> is called when pressing the ESC key.
      </>
    ),
  },
  {
    name: 'header',
    types: 'string',
    description: 'Sets visible text that describes the content of the modal.',
  },
  {
    name: 'isOpen',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Determines if the modal/dialog is open.',
  },
  {
    name: 'onClose',
    types: '() => void',
    description: 'Function that will be called on close events.',
  },
  {
    name: 'variant',
    types: ['modal', 'dialog'],
    defaultValue: 'modal',
    description: 'Determines the modal variant.',
  },
];

export const ModalPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={modalProps} title="Modal" {...props} />
);
