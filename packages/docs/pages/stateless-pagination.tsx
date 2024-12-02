import { H1, Panel, StatelessPagination, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { MarginPropTable, StatelessPaginationPropTable } from '../PropTables';

const StatelessPaginationPage = () => {
  return (
    <>
      <H1>StatelessPagination</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>StatelessPagination</Code> is used to divide a long list or table into
          several pages, indicating other pages exist and allowing the user to access them. This
          makes the content easier to read and ensures faster loading time. The user can easily
          navigate through the pages in order. The user can also select the number of results they
          want to see on each page, giving them more control over the way they view the data.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>On tables that contain more than 25 number of rows of data/content.</List.Item>
          <List.Item>
            When the data/content uses a cursor-based form of pagination or if you wish to add
            custom logic around pagination.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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

            const notFirstPage = page !== 1;
            const notLastPage = page < items.length / range;

            return (
              <>
                <StatelessPagination
                  itemsPerPage={range}
                  itemsPerPageOptions={ranges}
                  onItemsPerPageChange={onItemsPerPageChange}
                  onNext={notLastPage ? () => setPage((current) => current + 1) : undefined}
                  onPrevious={notFirstPage ? () => setPage((current) => current - 1) : undefined}
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
        <StatelessPaginationPropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t place <Code primary>StatelessPagination</Code> below a table.
            </>,
            'Don’t show dropdown arrow when there are less than 10 items.',
          ]}
          recommended={[
            <>
              Place <Code primary>StatelessPagination</Code> directly above the header of the table
              that it controls, right aligned.
            </>,
            'Disable dropdown options greater than the option that will show the total number of results (e.g., if there are 42 results, the highest option should be 50).',
            'Dropdown increments should be multiples of 10 and in increments that make sense for the context.',
          ]}
        />
      </Panel>
    </>
  );
};

export default StatelessPaginationPage;
