import { Counter, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { CounterPropTable } from '../PropTables';

const CounterPage = () => {
  return (
    <>
      <H1>Counter</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Counter</Code> is a field that lets you increase or decrease its value incrementally, as well as
          directly input a value.
        </Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>
            Use <Code primary>Counter</Code>s to input values that have a small range of likely values (e.g. 1-10).
          </List.Item>
          <List.Item>
            Use <Code primary>Counter</Code>s for values that are usually a number with some exceptions - e.g. number of
            copies.
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
                <>
                  <Text>
                    <Code primary>Counter</Code>s are stylized numerical form controls with the ability to control
                    validation.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [counterValue, setCounterValue] = useState(5);
                      const handleChange = (value: number) => {
                        setCounterValue(value);
                      };

                      return (
                        <Form>
                          <FormGroup>
                            <Counter
                              label="Label"
                              description="Description for the counter."
                              value={counterValue}
                              min={0}
                              max={10}
                              onCountChange={handleChange}
                            />
                          </FormGroup>
                        </Form>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'error-states',
              title: 'Error states',
              render: () => (
                <>
                  <Text>
                    <Code primary>Counter</Code>s allow you to pass in an <Code primary>error</Code> message that will
                    control the styles of a <Code primary>Counter</Code>. The logic on the counter can be controlled
                    with the <Code primary>onCountChange</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [counterValue, setCounterValue] = useState(0);
                      const [errors, setErrors] = useState('Number of items must be at least 1.');
                      const handleChange = (value: number) => {
                        setCounterValue(value);

                        if (value >= 1) {
                          setErrors('');
                        } else {
                          setErrors('Number of items must be at least 1.');
                        }
                      };

                      return (
                        <Form>
                          <FormGroup>
                            <Counter
                              label="Products"
                              required
                              description="Select at least one item."
                              error={errors}
                              onCountChange={handleChange}
                              value={counterValue}
                            />
                          </FormGroup>
                        </Form>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <CounterPropTable renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              <Code primary>Counter</Code>s should have a default value that represents the most likley choice the user
              will take.
            </>,
            <>
              <Code primary>Counter</Code>s should always have a clear label as to what the number represents.
            </>,
            <>
              Include relevant signs (e.g. %, $) in the <Code primary>Counter</Code> to give context for the value’s
              type.
            </>,
          ]}
          discouraged={[
            <>
              Avoid <Code primary>Counter</Code>s if the value will likley change by large/unpredictable increments
              (e.g. price).
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default CounterPage;
