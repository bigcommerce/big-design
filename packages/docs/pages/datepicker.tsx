import { Datepicker, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { DatepickerPropTable } from '../PropTables';

const DatepickerPage = () => {
  return (
    <>
      <H1>Datepicker</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Date pickers allow users to select a specific date. Users can input dates either by typing on the field or by
          selecting from the dropdown calendar.
        </Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>
            Use a date picker when the user need to input a specific date. It works best when the user need to pick a
            date close to the present time or the exact date is known by the user.
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
                  <Text>Use to select a single date from the calendar.</Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [date, setDate] = useState<string>();

                      return (
                        <Form>
                          <FormGroup>
                            <Datepicker
                              label="Pick a date"
                              min="06/03/2020"
                              max="06/19/2020"
                              onDateChange={(value: string) => setDate(value)}
                              value={date}
                              locale="en-US"
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
                    Datepicker allows you to pass in an <Code primary>error</Code> message that will control the styles
                    of a counter. The logic on the datepicker can be controlled with the{' '}
                    <Code primary>onDateChange</Code> prop.
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
                              label="Pick a date"
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
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <DatepickerPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default DatepickerPage;
