import { Form, FormGroup, H1, Input, InputProps, Panel, Text } from '@bigcommerce/big-design';
import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useState } from 'react';

import {
  Code,
  CodePreview,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
  NextLink,
} from '../components';
import { InputPropTable } from '../PropTables';

const InputPage = () => {
  return (
    <>
      <H1>Input</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Inputs</Code> are form controls that allow entering numeric or text data,
          often supported by system validation.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use text inputs to let the user input short lines of text or numbers.
          </List.Item>
          <List.Item>
            Most of the time used within <NextLink href="/form">Forms</NextLink>.
          </List.Item>
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
                    <Code primary>Inputs</Code> are stylized form controls with the ability of
                    controling validation.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [value, setValue] = useState('');

                      const handleChange: InputProps['onChange'] = (event) =>
                        setValue(event.target.value);

                      return (
                        <Form>
                          <FormGroup>
                            <Input
                              description="Description for the input."
                              label="Label"
                              onChange={handleChange}
                              placeholder="Placeholder"
                              type="text"
                              value={value}
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
            {
              id: 'error-states',
              title: 'Error states',
              render: () => (
                <Fragment key="error-states">
                  <Text>
                    Inputs allow you to pass in an <Code primary>error</Code> message that will
                    control the styles of an input. The logic on the input can be controlled with
                    the <Code primary>onChange</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Input
                          description="Provide a valid email address."
                          error="Email address must contain a domain name."
                          label="Email Address"
                          onChange={() => null}
                          value="example@"
                        />
                      </FormGroup>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'icons',
              title: 'Icons',
              render: () => (
                <Fragment key="icons">
                  <Text>
                    Inputs can also contain icons via the <Code primary>iconLeft</Code> &amp;{' '}
                    <Code primary>iconRight</Code> props.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Input
                          iconLeft={<CheckCircleIcon color="success" />}
                          label="Example"
                          placeholder="Example"
                        />
                        <Input
                          iconRight={<CheckCircleIcon color="success" />}
                          label="Example"
                          placeholder="Example"
                        />
                      </FormGroup>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <InputPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              If the expected input is more than one sentence, use the{' '}
              <NextLink href="/textarea">Textarea</NextLink> component instead.
            </>,
            'Avoid using long input labels that do not decribe the content needed.',
            'Allow more than one line of text.',
          ]}
          recommended={[
            'Provide placeholder text, examples or formats of relevent content.',
            'Provide inline error notification post input submission.',
            <>
              Use <Code primary>labels</Code> to help users understand what information to enter.
            </>,
            'Size input containers to their expected content.',
          ]}
        />
      </Panel>
    </>
  );
};

export default InputPage;
