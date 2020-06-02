import { Datepicker, Form, FormGroup, H0, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview } from '../../components';

const DatepickerPage = () => (
  <>
    <H0>Datepicker</H0>

    <Text>Datepicker is good</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [date, setDate] = useState<Date>(new Date());

        return (
          <Form>
            <FormGroup>
              <Datepicker label="this is label" onChange={(value) => setDate(value)} selected={date} />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default DatepickerPage;
