import React from 'react';

import { Code, PropTable } from '../components';

export const RadioPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="label" types="ReactChild" required>
      Label to display next to a <Code>Radio</Code> component.
    </PropTable.Prop>
  </PropTable>
);
