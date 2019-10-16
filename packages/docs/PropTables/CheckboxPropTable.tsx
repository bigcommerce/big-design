import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const checkboxProps: Prop[] = [
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

export const CheckboxPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Checkbox" propList={checkboxProps} {...props} />
);
