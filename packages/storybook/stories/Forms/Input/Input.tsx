import { Form, H0, H1, H2, Input, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import { InputDescriptionPropTable, InputErrorPropTable, InputLabelPropTable, InputPropTable } from './';

export const InputStory: React.FC = () => (
  <>
    <H0>Input</H0>

    <Text />

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState('');

        const handleChange = e => setValue(e.target.value);

        return (
          <Form.Row>
            <Input
              label="Label"
              description="Description for the input."
              placeholder="Placeholder"
              type="text"
              value={value}
              onChange={handleChange}
            />
          </Form.Row>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Input</H2>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <InputPropTable />

    <H2>Input.Description</H2>

    <InputDescriptionPropTable />

    <H2>Input.Error</H2>

    <InputErrorPropTable />

    <H2>Input.Label</H2>

    <InputLabelPropTable />
  </>
);
