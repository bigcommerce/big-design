import { Box, H0, H1, H2, Link, Tabs, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { TabsPropTable, TabPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Tabs</H0>

    <Text>
      The <Code primary>Tabs</Code> and <Code primary>Tabs.Tab</Code> components are used to organize and navigate
      between content types that are related and at the same level of information architecture heirarchy.{' '}
      <Link href="https://design.bigcommerce.com/components/tabs">Tabs Design Guidelines</Link>.
    </Text>

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

    <H1>API</H1>

    <H2>Tabs</H2>

    <TabsPropTable />

    <H2>Tabs.Tab</H2>

    <TabPropTable />
  </>
);
