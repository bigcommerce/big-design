import { Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTableWrapper } from '../components';

export const SwitchPropTable: React.FC<PropTableWrapper> = () => (
  <Panel header="Switch">
    <Text>
      Switches are a stylized <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states.
    </Text>
    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>
  </Panel>
);
