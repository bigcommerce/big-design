import {
  Box,
  Button,
  Checkbox,
  Form,
  H2,
  Input,
  PlusIcon,
  Radio,
  Text,
  Textarea,
  TextareaProps,
} from '@bigcommerce/big-design';
import { boolean, number, NumberOptions } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Forms', module)
  .add('Overview', () => (
    <>
      <H2>Form Field</H2>

      <Text>
        Form fields examples. Implementation detail: id will be auto-generated for input and label(for). Unless manually
        specifying one
      </Text>

      <Form>
        <Form.Fieldset
          legend="Primary contact"
          description="Minim velit quis aute adipisicing adipisicing do do exercitation cupidatat enim ex voluptate consequat labore."
        >
          <Form.Row>
            <Input
              label="First Name"
              description="This is an example description for First Name"
              placeholder="Placeholder text"
            />
          </Form.Row>

          <Form.Row>
            <Input
              label="Middle Name"
              description="This is an example description for Last Name. Featuring a Left Icon."
              iconLeft={<PlusIcon />}
              placeholder="Placeholder text"
            />
          </Form.Row>

          <Form.Row>
            <Input
              label="Last Name"
              description="This is an example description for Last Name. Featuring a Right Icon."
              placeholder="Placeholder text"
              iconRight={<PlusIcon />}
            />
          </Form.Row>

          <Form.Row>
            <Input
              label="Password"
              description="The password must contain at least 8 characters. (Also features manually setting id, inspect it!)"
              id="manualId"
              placeholder="Placeholder text"
              type="password"
              error="Your password is not strong enough."
            />
          </Form.Row>

          <Form.Row>
            <Input
              label="Company"
              description="This is an example description for Company. Featuring a Disabled field."
              placeholder="Placeholder text disabled"
              disabled
            />
          </Form.Row>

          <Form.Row>
            <Textarea
              label="Description"
              description="This is an example description. Use Knobs to preview props."
              placeholder="Placeholder text"
              rows={
                number('Textarea rows', 3, {
                  range: true,
                  min: 1,
                  max: 7,
                  step: 1,
                } as NumberOptions) as TextareaProps['rows']
              }
              resize={boolean('Resizeable textarea', true)}
              disabled={boolean('Disable textarea', false)}
            />
          </Form.Row>

          <Form.Row>
            <Input label="State" placeholder="Placeholder" />
            <Input label="City" placeholder="Placeholder" />
          </Form.Row>

          <Form.Row>
            <Input label="State" placeholder="Placeholder" />
            <Input label="City" placeholder="Placeholder" />
            <Input label="Country" placeholder="Placeholder" />
          </Form.Row>
        </Form.Fieldset>

        <Form.Fieldset legend="Checkboxes" description="This is a description for checkboxes">
          <Form.Row>
            <Checkbox label="Unchecked" checked={false} onChange={() => null} />
          </Form.Row>
          <Form.Row>
            <Checkbox label="Checked" checked={true} onChange={() => null} />
          </Form.Row>
        </Form.Fieldset>

        <Form.Fieldset legend="Radio buttons" description="This is a description for radio buttons">
          <Form.Row>
            <Radio label="Unchecked" name="test-group" checked={false} onChange={() => null} />
          </Form.Row>
          <Form.Row>
            <Radio label="Checked" name="test-group" checked={true} onChange={() => null} />
          </Form.Row>
        </Form.Fieldset>
      </Form>
    </>
  ))
  .add('Avalara Demo', () => (
    <>
      <H2>Create your Avalara AvaTax account</H2>

      <Text>
        Avalara AvaTax calculates sales tax automatically – and it’s complimentary with your BigCommerce account. If you
        already have an Avalara AvaTax account, please <a href="#">log in</a>.
      </Text>

      <Form>
        <Form.Fieldset legend="Primary contact">
          <Form.Row>
            <Input label="First name" value="Johnny" onChange={() => null} />
            <Input label="Last name" value="Commerce" onChange={() => null} />
          </Form.Row>

          <Form.Row>
            <Input label="Phone number" value="+01 926186286" onChange={() => null} />
          </Form.Row>

          <Form.Row>
            <Input
              label="Email"
              type="email"
              value="myemail@domain.com"
              error="This email address is already registered with Avalara."
              onChange={() => null}
            />
          </Form.Row>

          <Form.Row>
            <Input
              label="Password"
              description="The password must contain at least 8 characters, including at least one uppercase letter, lowercase letter, special character and number."
              type="password"
              value="thisisapassword"
              onChange={() => null}
            />
          </Form.Row>
        </Form.Fieldset>

        <Form.Fieldset
          legend="Primary business address"
          description="Avalara AvaTax uses your business address as a starting point for figuring out where you need to collect and remit taxes."
        >
          <Form.Row>
            <Input label="Address" value="1 Smail Street, Level 6, Suite 2" onChange={() => null} />
          </Form.Row>
          <Form.Row>
            <Input label="City" value="Ultimo" onChange={() => null} />
          </Form.Row>
          <Form.Row>
            <Input label="State" placeholder="Select a state" error="Please select a state to continue." />
            <Input label="Postal code" value="207" error="Invalid postcode." onChange={() => null} />
          </Form.Row>
        </Form.Fieldset>

        <Form.Fieldset
          legend="Shipping origin address"
          description="Enter below the primary address where your products are shipped from. Including it helps Avalara AvaTax calculate your taxes with more accuracy."
        >
          <Form.Row>
            <Checkbox label="Same as primary business address" checked onChange={() => null} />
          </Form.Row>
        </Form.Fieldset>

        <Form.Fieldset legend="Terms and Conditions">
          <Form.Row>
            <Checkbox
              label="By connecting to an Avalara account, I accept the Avalara terms and conditions."
              checked
              onChange={() => null}
            />
          </Form.Row>
        </Form.Fieldset>

        <Box marginTop="xxLarge">
          <Button>Connect</Button>
          <Button variant="subtle" marginLeft="medium">
            Cancel
          </Button>
        </Box>
      </Form>
    </>
  ));
