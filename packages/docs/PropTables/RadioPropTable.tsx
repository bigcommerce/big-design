import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const radioProps: Prop[] = [
  {
    name: 'label',
    types: 'ReactChild',
    required: true,
    description: (
      <>
        Label to display next to a <Code>Radio</Code> component.
      </>
    ),
  },
];

export const RadioPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Radio" propList={radioProps} {...props} />
);
