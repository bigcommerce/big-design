import { Form, H0, H1, H2, Link, Text, Textarea } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import {
  TextareaDescriptionPropTable,
  TextareaErrorPropTable,
  TextareaLabelPropTable,
  TextareaPropTable,
} from '../../PropTables';

export default () => (
  <>
    <H0>Textarea</H0>

    <Text>
      Textareas are stylized form controls with the ability of controling validation.{' '}
      <Link href="https://bigcommerce.design/fields" target="_blank">
        Form Fields Design Guidelines.
      </Link>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState('');

        const handleChange = event => setValue(event.target.value);

        return (
          <Form.Group>
            <Textarea
              label="Label"
              description="Description for the textarea."
              placeholder="Placeholder"
              rows={3}
              resize={true}
              value={value}
              onChange={handleChange}
            />
          </Form.Group>
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

    <H1>Error State</H1>

    <Text>
      Textareas allow you to pass in an <Code primary>error</Code> message that will control the styles of an input. The
      logic on the input can be controlled with the <Code primary>onChange</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Textarea
            label="Description"
            description="Description needs to be at least 64 characters long."
            value="Start of some text..."
            minLength={64}
            error="Field needs to contain at least 64 characters."
            onChange={() => null}
          />
        </Form.Group>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Controlling Rows</H1>

    <Text>
      By default, a <Code>Textarea</Code> displays with <Code>3</Code> rows. In order to set the intial amount of rows,
      pass in the <Code>rows</Code> prop. There can only be a maximum of <Code>7</Code> rows.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form.Group>
        <Textarea label="Label" description="Textarea with 5 rows." placeholder="Placeholder" rows={5} />
      </Form.Group>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Resizable</H1>

    <Text>
      You can also control whether <Code>Textarea</Code> components are resizeable. Resizing is only available on the
      vertical axis.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form.Group>
        <Textarea label="Label" placeholder="Textarea cannot be resized." resize={false} />
      </Form.Group>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
