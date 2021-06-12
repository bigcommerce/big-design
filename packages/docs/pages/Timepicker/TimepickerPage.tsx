import { Form, FormGroup, H1, Panel, Tabs, Text, Timepicker } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { TimepickerPropTable } from '../../PropTables';

const TimepickerPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <TimepickerPropTable />;
      case 'examples':
      default:
        return (
          <Panel>
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
        );
    }
  };

  return (
    <>
      <H1>Timepicker</H1>

      <Text>Timepicker is used to select a time in specific hours and minutes.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default TimepickerPage;
