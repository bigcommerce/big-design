import { H0, H1, H2, Pagination, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { CodePreview } from '../../components';
import { MarginPropTable, PaginationPropTable } from '../../PropTables';

const PaginationPage = () => (
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

    <H1>API</H1>
    <PaginationPropTable />

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />
  </>
);

export default PaginationPage;
