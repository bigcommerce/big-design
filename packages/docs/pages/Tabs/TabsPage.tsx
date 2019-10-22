import { Box, H0, H1, Link, Tabs, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { TabsPropTable, TabItemPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Tabs</H0>

    <Text>
      The <Code primary>Tabs</Code> component is used to organize and navigate between content types that are related
      and at the same level of information architecture heirarchy.{' '}
      <Link href="https://design.bigcommerce.com/components/tabs" target="_blank">
        Tabs Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [activeTab, setActiveTab] = React.useState('tab1');

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

    <H1>API</H1>
    <TabsPropTable />
    <TabItemPropTable id="tabs-items-prop-table" />
  </>
);
