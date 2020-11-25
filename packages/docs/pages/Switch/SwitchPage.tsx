import { Box, H0, H1, Switch, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { SwitchPropTable } from '../../PropTables';

const SwitchPage = () => (
  <>
    <H0>Switch</H0>

    <Text>
      Switches are a stylized <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states. Switches
      are intended to be used for immediate toggle actions and are therefore not intended to be used in forms.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Box>
            <Switch checked={checked} onChange={handleChange} />
          </Box>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <SwitchPropTable />
  </>
);

export default SwitchPage;
