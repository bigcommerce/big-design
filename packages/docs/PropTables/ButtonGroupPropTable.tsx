import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const buttonGroupProps: Prop[] = [
  {
    name: 'actions',
    types: 'object[]',
    description: (
      <>
        Accepts an array of objects with
        <NextLink href="/Button/ButtonPage" as="/button">
          Button
        </NextLink>{' '}
        props and and additional <Code>text</Code> prop. See example for usage.
      </>
    ),
    required: true,
  },
];

export const ButtonGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="ButtonGroup" propList={buttonGroupProps} {...props} />
);
