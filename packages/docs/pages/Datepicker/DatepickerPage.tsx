import { Datepicker, Form, FormGroup, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { DatepickerPropTable } from '../../PropTables';

const DatepickerPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <DatepickerPropTable />;
      case 'examples':
      default:
        return (
          <>
            <Panel>
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
            </Panel>
            <Panel header="Error states">
              <Text>
                Datepicker allows you to pass in an <Code primary>error</Code> message that will control the styles of a
                counter. The logic on the datepicker can be controlled with the <Code primary>onDateChange</Code> prop.
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
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Datepicker</H1>
      <Text>Use to select a single date from the calendar.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default DatepickerPage;
