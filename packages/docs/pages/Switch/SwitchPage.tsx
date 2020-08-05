import { Form, FormGroup, H0, H1, Switch, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { SwitchPropTable } from '../../PropTables';

const SwitchPage = () => (
  <>
    <H0>Switch</H0>

    <Text>
      Switches are a stylized <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Form>
            <FormGroup>
              <Switch checked={checked} onChange={handleChange} />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <SwitchPropTable />
  </>
);

export default SwitchPage;
