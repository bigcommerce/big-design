import React from 'react';

import { Code, Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'label',
    types: 'ReactChild',
    required: true,
    description: 'Label to display next to a <Code>Checkbox</Code> component.',
  },
  {
    name: 'isIndeterminate',
    types: 'boolean',
    description: (
      <>
        Styles and sets the checkbox into a indeterminate state. Note that the <Code primary>checked</Code> prop will
        take precedence over <Code primary>isIndeterminate</Code>.
      </>
    ),
  },
];

export const CheckboxPropTable: React.FC = () => <PropTable propList={props} />;
