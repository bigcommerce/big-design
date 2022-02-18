import { Box, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List, NextLink } from '../components';
import { TabItemPropTable, TabsPropTable } from '../PropTables';

const TabsPage = () => {
  return (
    <>
      <H1>Tabs</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Tabs</Code> are navigation elements at the top of the page, used to switch between different
          groups of related content on a page.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Breaking up a page’s content into distinct chunks or tasks.</List.Item>
          <List.Item>
            Navigating between groups of content that are related and at the same level of hierarchy.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'tabs',
              title: 'Tabs',
              render: () => <TabsPropTable renderPanel={false} />,
            },
            {
              id: 'tab-item',
              title: 'TabItem',
              render: () => <TabItemPropTable id="tab-item-prop-table" renderPanel={false} />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Place <Code primary>Tabs</Code> with related content next to each other, and place in an order that is
              conducive to the user’s success in the experience.
            </>,
            <>
              If using the same <Code primary>Tabs</Code> for different pages, keep tab order consistent.
            </>,
            <>Make the tab label succinct and descriptive of the content within it.</>,
            <>
              Ensure <Code primary>Tabs</Code> relate to each other and organize the page’s content in a meaningful way.
            </>,
            <>
              Use <Code primary>Tabs</Code> to switch between related content.
            </>,
          ]}
          discouraged={[
            <>
              Don’t use more than eight <Code primary>Tabs</Code> per page. If more than eight <Code primary>Tabs</Code>{' '}
              are needed, consider other types of navigation or content organization.
            </>,
            <>
              Don’t use more than 4 words to label each <Code primary>Tab</Code>.
            </>,
            <>Don’t use icons in tab labels.</>,
            <>
              Don’t use <Code primary>Tabs</Code> to filter content on a page, instead use{' '}
              <NextLink href="/pill-tabs">PillTabs</NextLink>.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default TabsPage;
