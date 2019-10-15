import React from 'react';

import { Code, Prop, PropTable } from '../components';

const props: Prop[] = [
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

export const RadioPropTable: React.FC = () => <PropTable propList={props} />;
