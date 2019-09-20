import { Flex, H0, Pagination, Table } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';

import { data } from './data';

const columns: Array<{ id: string; label: string, minWidth?: number; align?: 'left' | 'center' | 'right'; format?(value): string }> = [
  { id: 'sku', label: 'Product SKU', minWidth: 124 },
  { id: 'name', label: 'Product Name', minWidth: 120 },
  { id: 'price', label: 'Price', align: 'right', format: value => `$${value.toFixed(2)}` },
];

export default () => {
  return (
    <>
      <H0>Table</H0>
      {/* <Text>
        Intro text.
        <Link href="https://design.bigcommerce.com/components" target="_blank">
          Design Guidelines
        </Link>
        .
      </Text> */}
      <CodePreview scope={{ data, columns }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const [items] = React.useState(data);
          const [ranges] = React.useState([10, 20, 30, 50, 100]);

          const [range, setRange] = React.useState(ranges[1]);
          const [page, setPage] = React.useState(1);
          const [currentItems, setCurrentItems] = React.useState([]);

          const onItemsPerPageChange = newRange => {
            setPage(1);
            setRange(newRange);
          };

          React.useEffect(() => {
            const maxItems = page * range;
            const lastItem = Math.min(maxItems, items.length);
            const firstItem = Math.max(0, maxItems - range);

            // @ts-ignore
            setCurrentItems(items.slice(firstItem, lastItem));
          }, [page, items, range]);

          const handleRowSelect = isSelected => console.log(isSelected);

          return (
            <>
              <Table selectable stickyHeader>
                <Table.Actions alignItems="center" justifyContent="stretch">
                  <Flex.Item flexGrow={2}>Test</Flex.Item>
                  <Flex.Item>
                    <Pagination
                      currentPage={page}
                      itemsPerPage={range}
                      itemsPerPageOptions={ranges}
                      totalItems={items.length}
                      onPageChange={newPage => setPage(newPage)}
                      onItemsPerPageChange={onItemsPerPageChange}
                    />
                  </Flex.Item>
                </Table.Actions>
                <Table.Head>
                  <Table.Row>
                    {columns.map(column => (
                      <Table.Cell key={column.id} minWidth={column.minWidth} align={column.align}>{column.label}</Table.Cell>
                    ))}
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {currentItems.map((row, index) => {
                    return (
                      <Table.Row key={index} onRowSelect={handleRowSelect}>
                        {columns.map(column => {
                          const value = row[column.id];

                          return (
                            <Table.Cell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </Table.Cell>
                          );
                        })}
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </>
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>
      {/* <H1>API</H1>
      <H2>Component Name</H2>
      <H2>Static Member</H2>
      <H2>Inherited Props</H2>
      <Collapsible title="Inherited Props">
        <InheritedPropTable />
      </Collapsible>
      <H1>Examples</H1>
      <H2>Example 1</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet>
      <H2>Example 2</H2>
      <CodePreview></CodePreview> || <CodeSnippet></CodeSnippet> */}
    </>
  );
};
