import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code } from '../components';

export const PanelPropTable: React.FC = () => (
  <Text>
    A <Code>Panel</Code> can use all <Code>Box</Code> props, besides <Code primary>backgroundColor</Code>,{' '}
    <Code primary>shadow</Code>, and any <Code primary>padding</Code> props. Otherwise, supports all native{' '}
    <Code>&lt;div /&gt;</Code> element attributes.
  </Text>
);
