import { Flex, FlexItem, H0, H1, Link, Panel, PillTabs, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { PillTabItemPropTable, PillTabsPropTable } from '../../PropTables';

const PillTabsPage = () => (
  <>
    <H0>Pill Tabs</H0>

    <Text>
      The <Code primary>Pill Tabs</Code> component is used to provide a set of filters that act on a collection of
      items. For usage with tables, see their respective components.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [activeTabs, setActiveTabs] = useState({
          shipping: false,
          orders: false,
        });
        const Card: React.FC<{ name: string; description: string }> = ({ name, description }) => (
          <Flex border="box" flexDirection="column" padding="medium" margin="small">
            <FlexItem marginBottom="small">
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
        const pillTabItems = [
          {
            isActive: activeTabs.shipping,
            text: 'Shipping',
            onClick: () => setActiveTabs({ ...activeTabs, shipping: !activeTabs.shipping }),
          },
          {
            isActive: activeTabs.orders,
            text: 'Orders',
            onClick: () => setActiveTabs({ ...activeTabs, orders: !activeTabs.orders }),
          },
        ];
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
        const isFiltered = Object.values(activeTabs).some(Boolean);
        const filteredCards = cards.filter((card) => activeTabs[card.type]);
        const appCards = isFiltered ? filteredCards : cards;

        return (
          <Panel header="App Marketplace">
            <PillTabs items={pillTabItems} />
            <Flex>
              {appCards.map(({ name, description }) => (
                <Card key={name} name={name} description={description} />
              ))}
            </Flex>
          </Panel>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <PillTabsPropTable />
    <PillTabItemPropTable id="pill-tabs-items-prop-table" />
  </>
);

export default PillTabsPage;
