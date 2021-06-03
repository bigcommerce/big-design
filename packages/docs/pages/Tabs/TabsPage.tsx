import { Box, H1, H3, Link, Tabs, Text, Panel } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { TabItemPropTable, TabsPropTable } from '../../PropTables';

const TabsPage = () => (
  <>
    <H1>Tabs</H1>

    <Panel>
      <Text>
        The <Code primary>Tabs</Code> component is used to organize and navigate between content types that are related
        and at the same level of information architecture heirarchy.
      </Text>

      <CodePreview lastChild>
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

    <TabsPropTable />
    <TabItemPropTable id="tabs-items-prop-table" />
  </>
);

export default TabsPage;
