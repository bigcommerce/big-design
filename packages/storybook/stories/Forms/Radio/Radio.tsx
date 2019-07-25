import { Form, H0, H1, H2, Radio, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import { RadioPropTable } from './index';

export const RadioStory: React.FC = () => (
  <>
    <H0>Radio</H0>

    <Text>{/* TODO: Description */}</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [selected, setSelected] = React.useState('');

        const handleChange = e => setSelected(e.target.value);

        return (
          <>
            <Form.Row>
              <Radio label="On" checked={selected === 'on'} value="on" onChange={handleChange} />
            </Form.Row>
            <Form.Row>
              <Radio label="Off" checked={selected === 'off'} value="off" onChange={handleChange} />
            </Form.Row>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Radio</H2>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <RadioPropTable />
  </>
);
