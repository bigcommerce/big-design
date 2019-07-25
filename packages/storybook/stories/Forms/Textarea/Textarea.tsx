import { Form, H0, H1, H2, Text, Textarea } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import {
  TextareaDescriptionPropTable,
  TextareaErrorPropTable,
  TextareaLabelPropTable,
  TextareaPropTable,
} from './index';

export const TextareaStory: React.FC = () => (
  <>
    <H0>Textarea</H0>

    <Text />

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState('');

        const handleChange = e => setValue(e.target.value);

        return (
          <Form.Row>
            <Textarea
              label="Label"
              description="Description for the textarea."
              placeholder="Placeholder"
              rows={3}
              resize={true}
              value={value}
              onChange={handleChange}
            />
          </Form.Row>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Textarea</H2>

    <Text>
      Supports all native <Code>&lt;textarea /&gt;</Code> element attributes.
    </Text>

    <TextareaPropTable />

    <H2>Textarea.Description</H2>

    <TextareaDescriptionPropTable />

    <H2>Textarea.Error</H2>

    <TextareaErrorPropTable />

    <H2>Textarea.Label</H2>

    <TextareaLabelPropTable />
  </>
);
