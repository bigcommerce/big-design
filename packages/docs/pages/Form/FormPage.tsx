import {
  Box,
  Button,
  Checkbox,
  Form,
  H0,
  H1,
  H2,
  Input,
  Link,
  Radio,
  Select,
  Text,
  Textarea,
} from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import {
  FormErrorPropTable,
  FormFieldsetPropTable,
  FormGroupPropTable,
  FormLabelPropTable,
  FormPropTable,
} from '../../PropTables';

export default () => (
  <>
    <H0>Forms</H0>

    <Text>
      Form fields are essential to any website or web application. <Code>id</Code>'s' will be auto-generated for
      input/textarea and labels <Code>for</Code> attribute, unless manually specifying one.{' '}
      <Link href="https://bigcommerce.design/fields" target="_blank">
        Form Fields Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Input
            label="Email"
            type="email"
            description="Please provide a valid email address."
            placeholder="Email address"
          />
        </Form.Group>
        <Form.Group>
          <Input label="Password" type="password" placeholder="Password" />
        </Form.Group>
        <Box marginTop="xxLarge">
          <Button>Sign In</Button>
        </Box>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Form</H2>

    <FormPropTable />

    <H2 id="error">Form.Error</H2>

    <FormErrorPropTable />

    <H2>Form.Fieldset</H2>

    <FormFieldsetPropTable />

    <H2>Form.Label</H2>

    <FormLabelPropTable />

    <H2>Form.Group</H2>

    <FormGroupPropTable />

    <H1>Input Types</H1>

    <Text>
      BigDesign comes with various input types: <Code>Input</Code>, <Code>Checkbox</Code>, <Code>Radio</Code>,{' '}
      <Code>Select</Code>, and <Code>Textarea</Code>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Input label="Example Input" placeholder="Example" />
        </Form.Group>
        <Form.Group>
          <Checkbox checked={true} onChange={() => null} label="Example Checkbox" />
        </Form.Group>
        <Form.Group>
          <Radio checked={true} onChange={() => null} label="Example Radio" />
        </Form.Group>
        <Form.Group>
          <Select label="Example Select" placeholder="Example" onItemChange={() => null}>
            <Select.Option value={1}>Option</Select.Option>
            <Select.Option value={2}>Option</Select.Option>
            <Select.Option value={3}>Option</Select.Option>
            <Select.Option value={4}>Option</Select.Option>
          </Select>
        </Form.Group>
        <Form.Group>
          <Textarea label="Example Textarea" placeholder="Example" />
        </Form.Group>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Layout</H1>

    <Text>
      You can up to 3 <Code>Input</Code> components in row to add more dimension to a <Code>Form.Group</Code>.{' '}
      <Code>Radio</Code> and <Code>Checkbox</Code> components will never display inline inside a <Code>Form.Group</Code>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Group>
          <Input label="Company" placeholder="BigCommerce" />
        </Form.Group>
        <Form.Group>
          <Input label="First Name" placeholder="John" />
          <Input label="Last Name" placeholder="Doe" />
        </Form.Group>
        <Form.Group>
          <Input label="City" placeholder="Austin" />
          <Input label="State" placeholder="Texas" />
          <Input label="Postal Code" placeholder="78726" />
        </Form.Group>
        <Form.Fieldset legend="Shipping Method">
          <Form.Group>
            <Radio label="Free – Three Day Shipping" checked onChange={() => null} />
            <Radio label="$4.99 – Two Day Shipping" />
            <Radio label="$9.99 – One Day Shipping" />
          </Form.Group>
        </Form.Fieldset>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Validation</H1>

    <Text>
      All form controls are tied to <Code primary>onChange</Code> or equivalent event handlers. Validation messages can
      be passed through the <Code>error</Code> prop. All input errors in an <Code>Form.Group</Code> will appear at the
      bottom of the group component component.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const ERROR_MSG = 'Must be less than or equal to 3 characters long.';

        const [value, setValue] = React.useState('BigCommerce');
        const [error, setError] = React.useState(ERROR_MSG);

        const handleSubmit = event => {
          const form = event.currentTarget;

          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        };

        const handleChange = event => {
          const { target } = event;
          const regex = RegExp(target.pattern, 'g');

          regex.test(target.value) ? setError('') : setError(ERROR_MSG);

          setValue(target.value);
        };

        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Input
                label="Example"
                description="Remove characters to preview validation."
                value={value}
                error={error}
                onChange={handleChange}
                pattern="^.{1,3}$"
              />
            </Form.Group>
            <Form.Group>
              <Input label="City" error="You must enter a valid City." placeholder="Austin" />
              <Input label="State" placeholder="Texas" />
              <Input label="Postal Code" error="You must enter a valid Postal Code." placeholder="78726" />
            </Form.Group>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
