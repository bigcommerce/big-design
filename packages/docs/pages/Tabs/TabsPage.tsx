import { Box, H1, Tabs, Text, Panel } from '@bigcommerce/big-design';
import React, { useState, useContext } from 'react';

import { Code, CodePreview, ActiveTabContext } from '../../components';
import { TabItemPropTable, TabsPropTable } from '../../PropTables';

const TabsPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <>
            <TabsPropTable />
            <TabItemPropTable id="tabs-items-prop-table" />
          </>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview>
                {/* jsx-to-string:start */}
                {function Example() {
                  const [activeTab, setActiveTab] = useState('tab1');

                  const items = [
                    { id: 'tab1', title: 'Example 1' },
                    { id: 'tab2', title: 'Example 2' },
                    { id: 'tab3', title: 'Example 3' },
                    { id: 'tab4', title: 'Example 4', disabled: true },
                  ];

                  return (
                    <>
                      <Tabs activeTab={activeTab} items={items} onTabClick={setActiveTab} />
                      <Box marginTop="large">
                        {activeTab === 'tab1' && <Text>Content 1</Text>}
                        {activeTab === 'tab2' && <Text>Content 2</Text>}
                        {activeTab === 'tab3' && <Text>Content 3</Text>}
                        {activeTab === 'tab4' && <Text>Content 4</Text>}
                      </Box>
                    </>
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
      <H1>Tabs</H1>
      <Text>
        The <Code primary>Tabs</Code> component is used to organize and navigate between content types that are related
        and at the same level of information architecture heirarchy.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default TabsPage;
