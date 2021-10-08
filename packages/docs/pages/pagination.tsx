import { H1, Pagination, Panel, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { CodePreview, List } from '../components';
import { MarginPropTable, PaginationPropTable } from '../PropTables';

const PaginationPage = () => {
  return (
    <>
      <H1>Pagination</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Pagination is used to divide a long list or table into several pages, indicating other pages exist and
          allowing the user to access them. This makes the content easier to read and ensures faster loading time. The
          user can easily navigate through the pages in order, or jump to any page in the list. The user can also select
          the number of results they want to see on each page, giving them more control over the way they view the data.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>On tables that contain more than X number of rows of data/content. </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Text>Pagination allows for navigation through pages of content.</Text>

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

      <Panel header="Props" headerId="props">
        <PaginationPropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />
      </Panel>
    </>
  );
};

export default PaginationPage;
