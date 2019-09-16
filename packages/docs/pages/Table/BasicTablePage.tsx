import { Flex, H0, Pagination, Table } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';

const items = [
  {
    name: 'itemsPerPage',
    type: 'number',
    defaults: null,
    description: 'Indicates how many items are displayed per page',
  },
  {
    name: 'currentPage',
    type: 'number',
    defaults: null,
    description: 'Indicates the page currently/initially displayed',
  },
  {
    name: 'totalItems',
    type: 'number',
    defaults: null,
    description: 'Indicates how many items in total will be displayed',
  },
];

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
      <CodePreview scope={{ items }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const ranges = [2, 3, 4];

          const [range, setRange] = React.useState(ranges[0]);
          const [page, setPage] = React.useState(1);
          const [currentItems, setCurrentItems] = React.useState([
            { name: '', type: '', defaults: null, description: '' },
          ]);

          React.useEffect(() => {
            let lastItem = page * range;
            const firstItem = lastItem - range;
            if (lastItem > items.length) {
              lastItem = items.length;
            }

            setCurrentItems(items.slice(firstItem, lastItem));
          }, [page, items, range]);

          return (
            <>
              <Table selectable>
                <Table.Actions alignItems="center" justifyContent="stretch">
                  <Flex.Item paddingHorizontal="xxLarge" flexGrow={2}>
                    Test
                  </Flex.Item>
                  <Flex.Item>
                    <Pagination
                      currentPage={page}
                      itemsPerPage={range}
                      itemsPerPageOptions={ranges}
                      totalItems={items.length}
                      onPageChange={newPage => setPage(newPage)}
                      onItemsPerPageChange={newRange => setRange(newRange)}
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
                  {currentItems.map(({ name, type, defaults, description }) => (
                    <Table.Row key={name}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{type}</Table.Cell>
                      <Table.Cell>{defaults}</Table.Cell>
                      <Table.Cell>{description}</Table.Cell>
                    </Table.Row>
                  ))}
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
