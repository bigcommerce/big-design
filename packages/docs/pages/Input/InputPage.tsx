import { Form, H0, H1, Input, Link, Text } from '@bigcommerce/big-design';
import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { InputDescriptionPropTable, InputErrorPropTable, InputLabelPropTable, InputPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Input</H0>

    <Text>
      Inputs are stylized form controls with the ability of controling validation.{' '}
      <Link href="https://design.bigcommerce.com/components/text-field" target="_blank">
        Text Field Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState('');

        const handleChange = event => setValue(event.target.value);

        return (
          <Form.Group>
            <Input
              label="Label"
              description="Description for the input."
              placeholder="Placeholder"
              type="text"
              value={value}
              onChange={handleChange}
            />
          </Form.Group>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <InputPropTable />
    <InputDescriptionPropTable />
    <InputErrorPropTable />
    <InputLabelPropTable />

    <H1>Error State</H1>

    <Text>
      Inputs allow you to pass in an <Code primary>error</Code> message that will control the styles of an input. The
      logic on the input can be controlled with the <Code primary>onChange</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Input
            label="Email Address"
            description="Provide a valid email address."
            value="example@"
            error="Email address must contain a domain name."
            onChange={() => null}
          />
        </Form.Group>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Icons</H1>

    <Text>
      Inputs can also contain icons via the <Code>iconLeft</Code> &amp; <Code>iconRight</Code> props.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Input label="Example" placeholder="Example" iconLeft={<CheckCircleIcon color="success" />} />
          <Input label="Example" placeholder="Example" iconRight={<CheckCircleIcon color="success" />} />
        </Form.Group>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
