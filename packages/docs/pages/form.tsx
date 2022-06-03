import {
  Box,
  Button,
  Checkbox,
  Counter,
  Datepicker,
  Fieldset,
  Form,
  FormControlLabel,
  FormGroup,
  H1,
  Input,
  Link,
  MultiSelect,
  Panel,
  Radio,
  Select,
  Switch,
  Text,
  Textarea,
  Timepicker,
} from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  FormDescriptionPropTable,
  FormErrorPropTable,
  FormFieldsetPropTable,
  FormGroupPropTable,
  FormLabelPropTable,
  FormPropTable,
  MarginPropTable,
} from '../PropTables';

const FormPage = () => {
  return (
    <>
      <H1>Form</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The provided <Code primary>Form</Code> component is a wrapper around an{' '}
          <Link
            external
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form"
            rel="nofollow noreferrer"
            target="_blank"
          >
            HTML {'<form />'}
          </Link>{' '}
          element. It provides form width styling and accessibility features when using form
          controls within.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Any usage of a form control.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    Form fields are essential to any website or web application. Unique{' '}
                    <Code>id</Code>'s' will be auto-generated for the form fields and labels{' '}
                    <Code>for</Code> attribute, unless manually specified.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Input
                          description="Please provide a valid email address."
                          label="Email"
                          placeholder="Email address"
                          required
                          type="email"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input label="Password" placeholder="Password" required type="password" />
                      </FormGroup>
                      <Box marginTop="xxLarge">
                        <Button type="submit">Sign in</Button>
                      </Box>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'input-types',
              title: 'Input types',
              render: () => (
                // React doesn't see this fragment as unique, so we use a key to force uniqueness.
                <Fragment key="input-types">
                  <Text>
                    BigDesign comes with many input types: <Code>Input</Code>, <Code>Checkbox</Code>
                    , <Code>Radio</Code>, <Code>Select</Code>, <Code>MultiSelect</Code>,{' '}
                    <Code>Textarea</Code>, <Code>Counter</Code>, <Code>Switch</Code>,{' '}
                    <Code>Datepicker</Code>, and <Code>Timepicker</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Input label="Example Input" placeholder="Example" />
                      </FormGroup>
                      <FormGroup>
                        <Checkbox checked={true} label="Example Checkbox" onChange={() => null} />
                      </FormGroup>
                      <FormGroup>
                        <Radio checked={true} label="Example Radio" onChange={() => null} />
                      </FormGroup>
                      <FormGroup>
                        <Select
                          label="Example Select"
                          onOptionChange={() => null}
                          options={[
                            { value: 1, content: 'Option 1' },
                            { value: 2, content: 'Option 2' },
                            { value: 3, content: 'Option 3' },
                            { value: 4, content: 'Option 4' },
                          ]}
                          placeholder="Example"
                        />
                      </FormGroup>
                      <FormGroup>
                        <MultiSelect
                          label="Example MultiSelect"
                          onOptionsChange={() => null}
                          options={[
                            { value: 1, content: 'Option 1' },
                            { value: 2, content: 'Option 2' },
                            { value: 3, content: 'Option 3' },
                            { value: 4, content: 'Option 4' },
                          ]}
                          placeholder="Example"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Textarea label="Example Textarea" placeholder="Example" />
                      </FormGroup>
                      <FormGroup>
                        <Counter label="Example Counter" onCountChange={() => null} value={1} />
                      </FormGroup>
                      <FormGroup>
                        <div>
                          <FormControlLabel renderOptional={true}>Example Switch</FormControlLabel>
                          <Switch checked={true} onChange={() => null} />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Datepicker
                          dateFormat="MMMM d, yyyy"
                          label="Example Datepicker"
                          onDateChange={() => null}
                          value={new Date().toISOString()}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Timepicker
                          label="Example Timepicker"
                          onTimeChange={() => null}
                          value="13:00"
                        />
                      </FormGroup>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'layout',
              title: 'Layout',
              render: () => (
                <Fragment key="layout">
                  <Text>
                    You can up to 3 <Code>Input</Code> components in row to add more dimension to a{' '}
                    <Code>FormGroup</Code>. <Code>Radio</Code> and <Code>Checkbox</Code> components
                    will never display inline inside a <Code>FormGroup</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Input label="Company" placeholder="BigCommerce" required />
                      </FormGroup>
                      <FormGroup>
                        <Input label="First Name" placeholder="John" required />
                        <Input label="Last Name" placeholder="Doe" required />
                      </FormGroup>
                      <FormGroup>
                        <Input label="City" placeholder="Austin" required />
                        <Input label="State" placeholder="Texas" required />
                        <Input label="Postal Code" placeholder="78726" required />
                      </FormGroup>
                      <Fieldset legend="Shipping Method">
                        <FormGroup>
                          <Radio checked label="Free – Three Day Shipping" onChange={() => null} />
                          <Radio label="$4.99 – Two Day Shipping" />
                          <Radio label="$9.99 – One Day Shipping" />
                        </FormGroup>
                      </Fieldset>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'validation',
              title: 'Validation',
              render: () => (
                <Fragment key="validation">
                  <Text>
                    All form controls are tied to <Code primary>onChange</Code> or equivalent event
                    handlers. Validation messages can be passed through the <Code>error</Code> prop.
                    All input errors in an <Code>FormGroup</Code> will appear at the bottom of the
                    group component component.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const ERROR_MSG = 'Must be less than or equal to 3 characters long.';

                      const [value, setValue] = useState('BigCommerce');
                      const [error, setError] = useState(ERROR_MSG);

                      const handleSubmit = (event: React.SyntheticEvent) => {
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        const form = event.currentTarget as HTMLFormElement;

                        if (form.checkValidity() === false) {
                          event.preventDefault();
                          event.stopPropagation();
                        }
                      };

                      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                        const { target } = event;
                        const regex = RegExp(target.pattern, 'g');

                        const errorMessage = regex.test(target.value) ? '' : ERROR_MSG;

                        setError(errorMessage);
                        setValue(target.value);
                      };

                      return (
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Input
                              description="Remove characters to preview validation."
                              error={error}
                              label="Example"
                              onChange={handleChange}
                              pattern="^.{1,3}$"
                              required
                              value={value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              error="You must enter a valid City."
                              label="City"
                              placeholder="Austin"
                              required
                            />
                            <Input label="State" placeholder="Texas" required />
                            <Input
                              error="You must enter a valid Postal Code."
                              label="Postal Code"
                              placeholder="78726"
                              required
                            />
                          </FormGroup>
                        </Form>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'form',
              title: 'Form',
              render: () => <FormPropTable inheritedProps={<MarginPropTable collapsible />} />,
            },
            {
              id: 'form-group',
              title: 'FormGroup',
              render: () => <FormGroupPropTable />,
            },
            {
              id: 'form-control-error',
              title: 'FormControlError',
              render: () => <FormErrorPropTable />,
            },
            {
              id: 'form-control-label',
              title: 'FormControlLabel',
              render: () => <FormLabelPropTable />,
            },
            {
              id: 'form-control-description',
              title: 'FormControlDescription',
              render: () => <FormDescriptionPropTable />,
            },
            {
              id: 'form-fieldset',
              title: 'Fieldset',
              render: () => <FormFieldsetPropTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={['Use forms for immediate actions (i.e. toggling a setting)']}
          recommended={[
            <>
              Use max-width form for most scenarios. <Code primary>fullWidth</Code> prop should be
              used non-traditional forms.
            </>,
            <>
              Use <Code>type="submit"</Code> on the button you want as your submit button (HTML
              defaults the first button as the submit action)
            </>,
            'Validate form fields before the user submits the form.',
          ]}
        />
      </Panel>
    </>
  );
};

export default FormPage;
