import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { sharedMessagingProps } from './shared';

const inlineAlertProps: Prop[] = [
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
  ...sharedMessagingProps,
];

export const InlineAlertPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="InlineAlert" propList={inlineAlertProps} {...props} />
);
