import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

const messageProps: Prop[] = [
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
];

export const MessagePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={messageProps} title="Message" {...props} />
);
