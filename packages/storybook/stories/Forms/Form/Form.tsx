import { Box, Button, Form, H0, H1, H2, Input, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import { FormErrorPropTable, FormFieldsetPropTable, FormLabelPropTable, FormPropTable, FormRowPropTable } from './';

export const FormStory: React.FC = () => (
  <>
    <H0>Forms</H0>

    <Text>
      Form fields are essential to any website or web application. <Code>id</Code>'s' will be auto-generated for
      input/textarea and labels <Code>for</Code> attribute—unless manually specifying one.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <Form.Row>
          <Input
            label="Email"
            type="email"
            description="Please provide a valid email address."
            placeholder="Email address"
          />
        </Form.Row>
        <Form.Row>
          <Input label="Password" type="password" placeholder="Password" />
        </Form.Row>
        <Box marginTop="xxLarge">
          <Button>Sign In</Button>
        </Box>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    {/*
      TODO:
        - Examples for Forms:
          - Input Types
          - Layout
          - Validation
        - Add some fluff text to Input Types
          - Checkbox
          - Input
          - Radio
          - Textarea
        - Add MarginProps & PaddingProps to Flex API
        - Add MarginProps to Buttons
        - Move Selects into Forms
    */}

    <H1>API</H1>

    <H2>Form</H2>

    <FormPropTable />

    <H2 id="error">Form.Error</H2>

    <FormErrorPropTable />

    <H2>Form.Fieldset</H2>

    <FormFieldsetPropTable />

    <H2>Form.Label</H2>

    <FormLabelPropTable />

    <H2>Form.Row</H2>

    <FormRowPropTable />
  </>
);
