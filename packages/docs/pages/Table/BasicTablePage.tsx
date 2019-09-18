import { Flex, H0, Pagination, Table } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';

interface Data {
  name: string;
  type: string;
  defaults: string;
  description: string;
}

function createData(
  name,
  type,
  defaults,
  description,
): Data {
  return { name, type, defaults, description };
}

const data: Data[] = new Array(100);

data.fill(createData('itemsPerPage', 'number', '', 'Indicates how many items are displayed per page'), 0, 100);

export default () => {
  return (
    <>
      <H0>Basic Table</H0>
      {/* <Text>
        Intro text.
        <Link href="https://design.bigcommerce.com/components" target="_blank">
          Design Guidelines
        </Link>
        .
      </Text> */}
      <CodePreview scope={{ data }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const [items] = React.useState(data);
          const [ranges] = React.useState([10, 25, 100]);

          const [range, setRange] = React.useState(ranges[2]);
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

          const handleRowSelect = (isSelected) => {
            console.log(isSelected);
          }

          return (
            <div style={{ overflow: 'auto', maxHeight: '1000px'}}>
              <Table selectable stickyHeader>
                <Table.Actions alignItems="center" justifyContent="stretch">
                  <Flex.Item flexGrow={2}>
                    Test
                  </Flex.Item>
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
                    <Table.Cell>Prop Name</Table.Cell>
                    <Table.Cell>Type</Table.Cell>
                    <Table.Cell>Default</Table.Cell>
                    <Table.Cell>Description</Table.Cell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {currentItems.map(({ name, type, defaults, description }, index) => (
                    <Table.Row key={index} onRowSelect={handleRowSelect}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{type}</Table.Cell>
                      <Table.Cell>{defaults}</Table.Cell>
                      <Table.Cell>{description}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
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
