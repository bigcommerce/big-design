import { Counter, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, PageNavigation } from '../components';
import { CounterPropTable } from '../PropTables';

const CounterPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>Counters are stylized numerical form controls with the ability to control validation.</Text>
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
          </Panel>
          <Panel header="Error states">
            <Text>
              Counters allow you to pass in an <Code primary>error</Code> message that will control the styles of a
              counter. The logic on the counter can be controlled with the <Code primary>onCountChange</Code> prop.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <CounterPropTable />,
    },
  ];

  return (
    <>
      <H1>Counter</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default CounterPage;
