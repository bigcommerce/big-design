import { Form, FormGroup, H1, Panel, Text, Timepicker } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { TimepickerPropTable } from '../PropTables';

const TimepickerPage = () => {
  return (
    <>
      <H1>Timepicker</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Timepickers</Code> allow users to choose a time value from the provided options. They can be
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
        <TimepickerPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Put the field next to the <Code primary>Timepicker</Code> field with unified label when there is a need to
              pick date and time (see examples).
            </>,
            'Use local time formats.',
          ]}
          discouraged={[]}
        />
      </Panel>
    </>
  );
};

export default TimepickerPage;
