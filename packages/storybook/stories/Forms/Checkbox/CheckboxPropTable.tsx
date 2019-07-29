import React from 'react';

import { Code, PropTable } from '../../../components';

export const CheckboxPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="label" types="ReactChild" required>
      Label to display next to a <Code>Checkbox</Code> component.
    </PropTable.Prop>
  </PropTable>
);
