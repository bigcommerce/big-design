import { Form, FormGroup, H1, Text, Timepicker } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview } from '../../components';
import { TimepickerPropTable } from '../../PropTables';

const TimepickerPage = () => (
  <>
    <H1>Timepicker</H1>

    <Text>Timepicker is used to select a time in specific hours and minutes.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [time, setTime] = useState<string>();

        return (
          <Form>
            <FormGroup>
              <Timepicker locale="en-US" value={time} onTimeChange={(value) => setTime(value)} />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <TimepickerPropTable />
  </>
);

export default TimepickerPage;
