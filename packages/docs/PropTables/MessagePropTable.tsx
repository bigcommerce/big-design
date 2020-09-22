import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

const messageProps: Prop[] = [
  ...sharedMessagingProps,
  {
    name: 'actions',
    types: 'object[]',
    description: (
      <>
        Accepts an array of objects with{' '}
        <NextLink href="/Button/ButtonPage" as="/button">
          Button
        </NextLink>{' '}
        props and an additional <Code>text</Code> prop. See example for usage.
      </>
    ),
  },
];

export const MessagePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Message" propList={messageProps} {...props} />
);
