import { Form, FormGroup, H1, Panel, Text, Timepicker } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, PageNavigation } from '../../components';
import { TimepickerPropTable } from '../../PropTables';

const TimepickerPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
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
        </Panel>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <TimepickerPropTable />,
    },
  ];

  return (
    <>
      <H1>Timepicker</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default TimepickerPage;
