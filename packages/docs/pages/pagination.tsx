import { Box, H1, Pagination, Panel, PillTabs, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { MarginPropTable, PaginationPropTable } from '../PropTables';

const PaginationPage = () => {
  const [mode, setMode] = useState<'offset' | 'stateless'>('offset');

  return (
    <>
      <H1>Pagination</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Pagination</Code> is used to divide a long list or table into several pages,
          indicating other pages exist and allowing the user to access them. This makes the content
          easier to read and ensures faster loading time. The user can easily navigate through the
          pages in order, or jump to any page in the list. The user can also select the number of
          results they want to see on each page, giving them more control over the way they view the
          data.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            On tables that contain more than 25 number of rows of data/content.{' '}
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <PillTabs
          activePills={[mode]}
          items={[
            { id: 'offset', title: 'Offset' },
            { id: 'stateless', title: 'Stateless' },
          ]}
          onPillClick={(value) => setMode(value === 'offset' ? 'offset' : 'stateless')}
        />
        <Box marginTop="xSmall">
          {mode === 'offset' ? (
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
                      onItemsPerPageChange={onItemsPerPageChange}
                      onPageChange={(newPage) => setPage(newPage)}
                      totalItems={items.length}
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
          ) : (
            <CodePreview>
              {/* jsx-to-string:start */}
              {function ExampleList() {
                const allItems = [
                  { name: 'Item1', cursor: 'abc123' },
                  { name: 'Item2', cursor: 'abc124' },
                  { name: 'Item3', cursor: 'abc125' },
                  { name: 'Item4', cursor: 'abc126' },
                  { name: 'Item5', cursor: 'abc127' },
                ];

                const ranges = [2, 3, 4];
                const [itemOptions, setItemOptions] = useState<{
                  range: (typeof ranges)[number];
                  cursor?: string;
                  target?: 'before' | 'after';
                }>({ range: ranges[0] });

                const [results, setResults] = useState<{
                  data: string[];
                  startCursor?: string;
                  endCursor?: string;
                  hasNext: boolean;
                  hasPrevious: boolean;
                }>({ data: [], hasNext: false, hasPrevious: false });

                useEffect(() => {
                  const targetIndex = allItems.findIndex(
                    (item) => item.cursor === itemOptions?.cursor,
                  );

                  const itemResults =
                    itemOptions?.target === 'before'
                      ? allItems.slice(targetIndex - itemOptions.range, targetIndex)
                      : allItems.slice(targetIndex + 1, itemOptions.range + targetIndex + 1);

                  console.log({ targetIndex, cursorTarget: itemOptions, itemResults });

                  setResults({
                    data: itemResults.map((item) => item.name),
                    startCursor: [...itemResults].shift()?.cursor,
                    endCursor: [...itemResults].pop()?.cursor,
                    hasNext: [...allItems].pop()?.cursor !== [...itemResults].pop()?.cursor,
                    hasPrevious: [...allItems].shift()?.cursor !== [...itemResults].shift()?.cursor,
                  });
                }, [itemOptions]);

                const goToNext = () =>
                  setItemOptions(({ range }) => ({
                    range,
                    cursor: results.endCursor,
                    target: 'after',
                  }));

                const goToPrevious = () =>
                  setItemOptions(({ range }) => ({
                    range,
                    cursor: results.startCursor,
                    target: 'before',
                  }));

                return (
                  <>
                    <Pagination
                      itemsPerPage={itemOptions.range}
                      itemsPerPageOptions={ranges}
                      onItemsPerPageChange={(range) => setItemOptions({ range })}
                      disableNext={!results.hasNext}
                      onNext={goToNext}
                      disablePrevious={!results.hasPrevious}
                      onPrevious={goToPrevious}
                    />
                    <ul>
                      {results.data.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          )}
        </Box>
      </Panel>

      <Panel header="Props" headerId="props">
        <PaginationPropTable mode={mode} inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t place <Code primary>Pagination</Code> below a table.
            </>,
            'Don’t show dropdown arrow when there are less than 10 items.',
          ]}
          recommended={[
            <>
              Place <Code primary>Pagination</Code> directly above the header of the table that it
              controls, right aligned.
            </>,
            'Disable dropdown options greater than the option that will show the total number of results (e.g., if there are 42 results, the highest option should be 50).',
            'Dropdown increments should be multiples of 10 and in increments that make sense for the context.',
          ]}
        />
      </Panel>
    </>
  );
};

export default PaginationPage;
