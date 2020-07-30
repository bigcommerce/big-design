import { Form, FormGroup, H0, H1, Text, Toggle } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { CheckboxDescriptionLinkPropTable, CheckboxDescriptionPropTable, CheckboxPropTable } from '../../PropTables';

const TogglePage = () => (
  <>
    <H0>Toggle</H0>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = useState(false);
        const handleChange = () => {
          console.log('called');
          setChecked(!checked);
        };

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

    <CheckboxPropTable />
    <CheckboxDescriptionPropTable />
    <CheckboxDescriptionLinkPropTable />

    <H1>Indeterminate</H1>

    <Text>
      Checkboxes support <Code primary>isIndeterminate</Code> passed as a prop to show a combined state of partially
      selected checkboxes.
    </Text>

    <H1>Description</H1>

    <Text>
      Checkboxes support <Code primary>description</Code> passed as a prop, which contains a text and an optional link.
    </Text>
  </>
);

export default TogglePage;
