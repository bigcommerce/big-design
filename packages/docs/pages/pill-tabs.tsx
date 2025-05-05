import { Flex, FlexItem, H1, Link, Panel, PillTabs, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { PillTabItemPropTable, PillTabsPropTable } from '../PropTables';

const PillTabsPage = () => {
  return (
    <>
      <H1>PillTabs</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>PillTabs</Code> are horizontal navigation buttons within panels. They switch
          between frequently used filters or sub-views of the same content.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            To switch between different views or filters of data within a table.
          </List.Item>
          <List.Item>To switch between different variants of content.</List.Item>
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
                <CodePreview>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [activePills, setActivePills] = useState<string[]>([]);
                    const Card: React.FC<{ name: string; description: string }> = ({
                      name,
                      description,
                    }) => (
                      <Flex
                        border="box"
                        borderRadius="normal"
                        flexDirection="column"
                        margin="xxSmall"
                        padding="medium"
                      >
                        <FlexItem marginBottom="xxSmall">
                          <Text bold>{name}</Text>
                        </FlexItem>
                        <FlexItem flexGrow={1}>
                          <Text>{description}</Text>
                        </FlexItem>
                        <FlexItem>
                          <Link href="#">Install</Link>
                        </FlexItem>
                      </Flex>
                    );
                    const items = [
                      { title: 'Shipping', id: 'shipping' },
                      { title: 'Orders', id: 'orders' },
                    ];
                    const onPillClick = (pillId: string) => {
                      const isPillActive = !activePills.includes(pillId);
                      const updatedPills = isPillActive
                        ? [...activePills, pillId]
                        : activePills.filter((activePillId) => activePillId !== pillId);

                      setActivePills(updatedPills);
                    };
                    const cards = [
                      {
                        name: 'Shipping App Pro',
                        description: 'All your shipping needs in a one stop shop.',
                        type: 'shipping',
                      },
                      {
                        name: 'Order Tracker Deluxe',
                        description: 'Track your orders across all your devices.',
                        type: 'orders',
                      },
                      {
                        name: 'Expedited Shipper',
                        description: 'The best rush rates in the country.',
                        type: 'shipping',
                      },
                      {
                        name: 'Inventory Wizard',
                        description: 'Inventory tracking app to cover all your needs.',
                        type: 'other',
                      },
                    ];
                    const isFiltered = Boolean(activePills.length);
                    const filteredCards = cards.filter((card) => activePills.includes(card.type));
                    const appCards = isFiltered ? filteredCards : cards;

                    return (
                      <>
                        <PillTabs
                          activePills={activePills}
                          items={items}
                          onPillClick={onPillClick}
                        />
                        <Flex>
                          {appCards.map(({ name, description }) => (
                            <Card description={description} key={name} name={name} />
                          ))}
                        </Flex>
                      </>
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'pill-tabs',
              title: 'PillTabs',
              render: () => <PillTabsPropTable />,
            },
            {
              id: 'pill-tab-item',
              title: 'PillTabItem',
              render: () => <PillTabItemPropTable id="pill-tabs-items-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>Don’t use to navigate between unrelated items.</>,
            <>Don’t link to content that’s hidden in default view.</>,
            <>
              Never use <Code primary>PillTabs</Code> to navigate a user away from the current page.
            </>,
          ]}
          recommended={[
            <>Use on pages that have a large amount of content.</>,
            <>
              Be concise on the navigation labels, ideally one or two words rather than a phrase.
            </>,
            <>
              Default page view should have no <Code primary>PillTabs</Code> selected.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default PillTabsPage;
