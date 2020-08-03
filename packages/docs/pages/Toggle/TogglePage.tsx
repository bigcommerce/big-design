import { Form, FormGroup, H0, H1, Toggle } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview } from '../../components';
import { TogglePropTable } from '../../PropTables';

const TogglePage = () => (
  <>
    <H0>Toggle</H0>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Form>
            <FormGroup>
              <Toggle checked={checked} onChange={handleChange} />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <TogglePropTable />
  </>
);

export default TogglePage;
