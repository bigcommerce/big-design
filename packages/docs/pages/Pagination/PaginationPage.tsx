import { H1, Pagination, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useEffect, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { MarginPropTable, PaginationPropTable } from '../../PropTables';

const PaginationPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <PaginationPropTable inheritedProps={<MarginPropTable collapsible />} />;
      case 'examples':
      default:
        return (
          <Panel>
            <CodePreview>
              {/* jsx-to-string:start */}
              {function ExampleList() {
                const [items] = useState(['Item1', 'Item2', 'Item3', 'Item 4', 'Item 5']);
                const [ranges] = useState([2, 3, 4]);
                const [range, setRange] = useState(ranges[0]);
                const [page, setPage] = useState(1);
                const [currentItems, setCurrentItems] = useState(['']);

                const onItemsPerPageChange = (newRange) => {
                  setPage(1);
                  setRange(newRange);
                };

                useEffect(() => {
                  const maxItems = page * range;
                  const lastItem = Math.min(maxItems, items.length);
                  const firstItem = Math.max(0, maxItems - range);

                  setCurrentItems(items.slice(firstItem, lastItem));
                }, [page, items, range]);

                return (
                  <>
                    <Pagination
                      currentPage={page}
                      itemsPerPage={range}
                      itemsPerPageOptions={ranges}
                      totalItems={items.length}
                      onPageChange={(newPage) => setPage(newPage)}
                      onItemsPerPageChange={onItemsPerPageChange}
                    />
                    <ul>
                      {currentItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
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
      <H1>Pagination</H1>
      <Text>Pagination allows for navigation through pages of content.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default PaginationPage;
