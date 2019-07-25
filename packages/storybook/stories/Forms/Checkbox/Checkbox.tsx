import { Checkbox, Form, H0, H1, H2, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import { CheckboxPropTable } from './';

export const CheckboxStory: React.FC = () => (
  <>
    <H0>Checkbox</H0>

    <Text>{/* TODO: Description */}</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = React.useState(false);
        const [label, setLabel] = React.useState('Unchecked');

        const handleChange = () => {
          setChecked(!checked);
          setLabel(!checked ? 'Checked' : 'Unchecked');
        };

        return (
          <Form.Row>
            <Checkbox label={label} checked={checked} onChange={handleChange} />
          </Form.Row>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Checkbox</H2>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <CheckboxPropTable />
  </>
);
