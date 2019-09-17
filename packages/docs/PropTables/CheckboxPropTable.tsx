import React from 'react';

import { Code, PropTable } from '../components';

export const CheckboxPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="label" types="ReactChild" required>
      Label to display next to a <Code>Checkbox</Code> component.
    </PropTable.Prop>
    <PropTable.Prop name="isIndeterminate" types="boolean">
      Styles and sets the checkbox into a indeterminate state. Note that the <Code primary>checked</Code> prop will take
      precedence over <Code primary>isIndeterminate</Code>.
    </PropTable.Prop>
  </PropTable>
);
