import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

const inlineMessageProps: Prop[] = [
  {
    name: 'actions',
    types: 'object[]',
    description: (
      <>
        Accepts an array of objects with <NextLink href="/button">Button</NextLink> props and an
        additional <Code>text</Code> prop. Also, only two variants will be available to use:
        "secondary" and "subtle". See example for usage.
      </>
    ),
  },
  ...sharedMessagingProps,
  {
    name: 'localization',
    types: '{ close: string }',
    description: 'Overrides the label with localized text.',
  },
];

export const InlineMessagePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={inlineMessageProps} title="InlineMessage" {...props} />
);
