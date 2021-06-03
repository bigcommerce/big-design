import { Datepicker, Form, FormGroup, H1, H3, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { DatepickerPropTable } from '../../PropTables';

const DatepickerPage = () => (
  <>
    <H1>Datepicker</H1>

    <Text>Use to select a single date from the calendar.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [date, setDate] = useState<string>();

        return (
          <Form>
            <FormGroup>
              <Datepicker
                label="Label"
                placeholder="Placeholder"
                min="06/03/2020"
                max="06/19/2020"
                onDateChange={(value: string) => setDate(value)}
                value={date}
                locale="en-AU"
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>

    <Text>
      Supports all native <Code>&lt;input [type="date"] /&gt;</Code> element attributes.
    </Text>

    <DatepickerPropTable />

    <H3>Error State</H3>

    <Text>
      Datepicker allows you to pass in an <Code primary>error</Code> message that will control the styles of a counter.
      The logic on the datepicker can be controlled with the <Code primary>onDateChange</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [date, setDate] = useState<string>();
        const [errors, setErrors] = useState('Please select a date.');
        const handleChange = (value: string) => {
          if (value) {
            setErrors('');
          } else {
            setErrors('Please select a date.');

            return;
          }

          return setDate(value);
        };

        return (
          <Form>
            <FormGroup>
              <Datepicker
                error={errors}
                label="Label"
                placeholder="Placeholder"
                onDateChange={handleChange}
                value={date}
                required
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default DatepickerPage;
