import { H0, H1, H2, Pagination, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, Collapsible } from '../../components';
import { MarginPropTable, PaginationPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Pagination</H0>

    <Text>
      Pagination allows for navigation through pages of content.{' '}
      {/* <Link href="https://design.bigcommerce.com/components/pagination" target="_blank">
        Pagination Design Guidelines
      </Link>
      . */}
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function ExampleList() {
        const [items] = React.useState(['Item1', 'Item2', 'Item3', 'Item 4', 'Item 5']);
        const [ranges] = React.useState([2, 3, 4]);
        const [range, setRange] = React.useState(ranges[0]);
        const [page, setPage] = React.useState(1);
        const [currentItems, setCurrentItems] = React.useState(['']);

        const onItemsPerPageChange = newRange => {
          setPage(1);
          setRange(newRange);
        };

        React.useEffect(() => {
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
              onPageChange={newPage => setPage(newPage)}
              onItemsPerPageChange={onItemsPerPageChange}
            />
            <ul>
              {currentItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Pagination</H2>

    <PaginationPropTable />

    <H2>Inherited Props</H2>

    <Collapsible title="Inherited Props">
      <MarginPropTable />
    </Collapsible>
  </>
);
