import { Form, FormGroup, H1, H3, Input, Link, Text } from '@bigcommerce/big-design';
import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { InputPropTable } from '../../PropTables';

const InputPage = () => (
  <>
    <H1>Input</H1>

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
        const [value, setValue] = useState('');

        const handleChange = (event) => setValue(event.target.value);

        return (
          <Form>
            <FormGroup>
              <Input
                label="Label"
                description="Description for the input."
                placeholder="Placeholder"
                type="text"
                value={value}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <InputPropTable />

    <H3>Error State</H3>

    <Text>
      Inputs allow you to pass in an <Code primary>error</Code> message that will control the styles of an input. The
      logic on the input can be controlled with the <Code primary>onChange</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Input
            label="Email Address"
            description="Provide a valid email address."
            value="example@"
            error="Email address must contain a domain name."
            onChange={() => null}
          />
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>Icons</H3>

    <Text>
      Inputs can also contain icons via the <Code>iconLeft</Code> &amp; <Code>iconRight</Code> props.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Input label="Example" placeholder="Example" iconLeft={<CheckCircleIcon color="success" />} />
          <Input label="Example" placeholder="Example" iconRight={<CheckCircleIcon color="success" />} />
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default InputPage;
