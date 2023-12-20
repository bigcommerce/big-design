import { Datepicker, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { DatepickerPropTable } from '../PropTables';

const DatepickerPage = () => {
  return (
    <>
      <H1>Datepicker</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Datepickers</Code> allow users to select a specific date. Users can input
          dates either by typing on the field or by selecting from the dropdown calendar.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use a <Code primary>Datepicker</Code> when the user need to input a specific date. It
            works best when the user need to pick a date close to the present time or the exact date
            is known by the user.
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
                <Fragment key="basic">
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
                              locale="en-US"
                              max="06/19/2020"
                              min="06/03/2020"
                              onDateChange={(value: string) => setDate(value)}
                              value={date}
                            />
                          </FormGroup>
                        </Form>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'error-states',
              title: 'Error states',
              render: () => (
                <Fragment key="error-state">
                  <Text>
                    <Code primary>Datepicker</Code> allows you to pass in an{' '}
                    <Code primary>error</Code> message that will control the styles of a counter.
                    The logic on the <Code primary>Datepicker</Code> can be controlled with the{' '}
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
                              required
                              value={date}
                            />
                          </FormGroup>
                        </Form>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <DatepickerPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            "Don’t enable dates that are erroneous in the context, for example, don’t enable dates in the past when users are planning a campaign, and don't enable a date that is prior to the start date in the end date picker.",
          ]}
          recommended={[
            'The selectable dates in the dropdown calendar should be suitable for the context. Use min and max dates to help prevent user error.',
            <>
              <Code primary>Datepicker</Code> works best when the user need to pick a date in the
              near future (or past) or the exact date is known by the user. If a user needs to input
              a far distant date, consider having the dropdown calendar default open to a more
              convenient day.
            </>,
            'Spell out the name of the month to distinguish it from the day.',
          ]}
        />
      </Panel>
    </>
  );
};

export default DatepickerPage;
