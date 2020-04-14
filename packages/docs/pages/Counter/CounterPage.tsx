import { Counter, Form, FormGroup, H0, H1, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { CounterPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Counter</H0>

    <Text>
      Counters are stylized numerical form controls with the ability of controling validation.{' '}
      <Link href="https://design.bigcommerce.com/components/text-field" target="_blank">
        Text Field Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [counterValue, setCounterValue] = React.useState(5);
        const handleChange = value => {
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

    <H1>API</H1>

    <Text>
      Supports most native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <CounterPropTable />

    <H1>Error State</H1>

    <Text>
      Counters allow you to pass in an <Code primary>error</Code> message that will control the styles of a counter. The
      logic on the counter can be controlled with the <Code primary>onChange</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [counterValue, setCounterValue] = React.useState(0);
        const [errors, setErrors] = React.useState('Number of items must be at least 1.');
        const handleChange = value => {
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
);
