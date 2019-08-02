import { Box, Tabs, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';

export default () => (
  <CodePreview>
    {/* jsx-to-string:start */}
    {function Example() {
      const [activeTab, setActiveTab] = React.useState('tab1');

      return (
        <>
          <Tabs activeTab={activeTab} onTabClick={setActiveTab}>
            <Tabs.Tab id="tab1">Example 1</Tabs.Tab>
            <Tabs.Tab id="tab2">Example 2</Tabs.Tab>
            <Tabs.Tab id="tab3">Example 3</Tabs.Tab>
            <Tabs.Tab id="tab4" disabled>
              Example 4
            </Tabs.Tab>
          </Tabs>
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
);
