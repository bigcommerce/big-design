import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const buttonGroupProps: Prop[] = [
  {
    name: 'actions',
    types: 'object[]',
    description: (
      <>
        Accepts an array of objects with <NextLink href="/button">Button</NextLink> props and and
        additional <Code>text</Code> & <Code>icon</Code> prop. See example for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'localization',
    types: '{ more: string }',
    description: 'Overrides the label with localized text.',
  },
];

export const ButtonGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={buttonGroupProps} title="ButtonGroup" {...props} />
);
