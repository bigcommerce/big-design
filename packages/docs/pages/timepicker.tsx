import { Form, FormGroup, H1, Panel, Text, Timepicker } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, List } from '../components';
import { TimepickerPropTable } from '../PropTables';

const TimepickerPage = () => {
  return (
    <>
      <H1>Timepicker</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Timepicker</Code>s allow users to choose a time value from the provided options. They can be
          used for a wide range of scenarios like specifiying promotion start/end time, store location working hours and
          so on.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>When there is a need to pick a time from predefined time options.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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
      </Panel>

      <Panel header="Props" headerId="props">
        <TimepickerPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default TimepickerPage;
