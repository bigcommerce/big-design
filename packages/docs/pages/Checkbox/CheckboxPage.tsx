import { Checkbox, Form, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { CheckboxPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Checkbox</H0>

    <Text>
      Checkboxes are a stylized <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states.{' '}
      <Link href="https://design.bigcommerce.com/components/checkboxes" target="_blank">
        Checkbox Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = React.useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Form.Group>
            <Checkbox label={checked ? 'Checked' : 'Unchecked'} checked={checked} onChange={handleChange} />
          </Form.Group>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <CheckboxPropTable />

    <H1>Indeterminate</H1>

    <Text>
      Checkboxs support <Code primary>isIndeterminate</Code> passed as a prop to show a combined state of partially
      selected checkboxes.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form.Group>
        <Checkbox label="Indeterminate" isIndeterminate />
      </Form.Group>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
