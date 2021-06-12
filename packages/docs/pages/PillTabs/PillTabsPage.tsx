import { Flex, FlexItem, H1, Link, PillTabs, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { PillTabItemPropTable, PillTabsPropTable } from '../../PropTables';

const PillTabsPage = () => {
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
            <PillTabsPropTable />
            <PillTabItemPropTable id="pill-tabs-items-prop-table" />
          </>
        );
      case 'examples':
      default:
        return (
          <CodePreview>
            {/* jsx-to-string:start */}
            {function Example() {
              const [activePills, setActivePills] = useState<string[]>([]);
              const Card: React.FC<{ name: string; description: string }> = ({ name, description }) => (
                <Flex border="box" flexDirection="column" padding="medium" margin="xxSmall" borderRadius="normal">
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
                  <PillTabs activePills={activePills} items={items} onPillClick={onPillClick} />
                  <Flex>
                    {appCards.map(({ name, description }) => (
                      <Card key={name} name={name} description={description} />
                    ))}
                  </Flex>
                </>
              );
            }}
            {/* jsx-to-string:end */}
          </CodePreview>
        );
    }
  };

  return (
    <>
      <H1>Pill tabs</H1>

      <Text>
        Provide a set of controls to filter a collection of items. For usage with tables, see their respective
        components.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default PillTabsPage;
