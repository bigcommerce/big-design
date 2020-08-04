import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTableWrapper } from '../components';

export const SwitchPropTable: React.FC<PropTableWrapper> = () => (
  <>
    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>
  </>
);
