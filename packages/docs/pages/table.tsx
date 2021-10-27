import { H1, Panel, Small, Table, TableFigure, TableItem, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  TableColumnsPropTable,
  TableFigurePropTable,
  TablePropTable,
  TableSelectablePropTable,
  TableSortablePropTable,
} from '../PropTables';

interface Item extends TableItem {
  sku: string;
  name: string;
  stock: number;
}

const data: Item[] = [
  { sku: 'ABS', name: '[Sample] Able Brewing System', stock: 225 },
  { sku: 'CC3C', name: '[Sample] Chemex Coffeemaker 3 cup', stock: 49 },
  { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
  { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
  { sku: 'OCG', name: '[Sample] Oak Cheese Grater', stock: 34 },
  { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
];

const columns = [
  { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
  { header: 'Name', hash: 'name', render: ({ name }) => name },
  { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
];

const sort = (items, columnHash, direction) => {
  return items
    .concat()
    .sort((a, b) =>
      direction === 'ASC' ? (a[columnHash] >= b[columnHash] ? 1 : -1) : a[columnHash] <= b[columnHash] ? 1 : -1,
    );
};

const dragEnd = (items, from, to) => {
  const item = items.splice(from, 1);
  items.splice(to, 0, ...item);

  return items;
};

const TablePage = () => {
  return (
    <>
      <H1>Table</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Tables</Code> are used to display data related to a single subject, across one or more rows and
          columns.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            When you have multiple objects of the same type you would like to display information about.
          </List.Item>
          <List.Item>When you need to rapidly add multiple items to a parent object.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Table
                    columns={[
                      { header: 'Sku', hash: 'sku', tooltip: 'Header tooltip', render: ({ sku }) => sku },
                      { header: 'Name', hash: 'name', render: ({ name }) => name },
                      { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
                    ]}
                    items={[
                      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
                      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
                      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
                      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
                      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
                    ]}
                    stickyHeader
                  />
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'selectable',
              title: 'Selectable',
              render: () => (
                <CodePreview scope={{ data, columns }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

                    return (
                      <Table
                        keyField="sku"
                        columns={columns}
                        items={data}
                        itemName="Products"
                        selectable={{
                          selectedItems,
                          onSelectionChange: setSelectedItems,
                        }}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'pagination',
              title: 'Pagination',
              render: () => (
                <CodePreview scope={{ data, columns }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [currentPage, setCurrentPage] = useState(1);
                    const [itemsPerPageOptions] = useState([5, 10, 20, 30]);
                    const [itemsPerPage, setItemsPerPage] = useState(5);
                    const [currentItems, setCurrentItems] = useState<Item[]>([]);

                    const onItemsPerPageChange = (newRange) => {
                      setCurrentPage(1);
                      setItemsPerPage(newRange);
                    };

                    useEffect(() => {
                      const maxItems = currentPage * itemsPerPage;
                      const lastItem = Math.min(maxItems, data.length);
                      const firstItem = Math.max(0, maxItems - itemsPerPage);

                      setCurrentItems(data.slice(firstItem, lastItem));
                    }, [currentPage, itemsPerPage]);

                    return (
                      <Table
                        keyField="sku"
                        columns={columns}
                        items={currentItems}
                        itemName="Products"
                        pagination={{
                          currentPage,
                          totalItems: data.length,
                          onPageChange: setCurrentPage,
                          itemsPerPageOptions,
                          onItemsPerPageChange,
                          itemsPerPage,
                        }}
                        stickyHeader
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'sortable',
              title: 'Sortable',
              render: () => (
                <CodePreview scope={{ data, columns, sort }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [items, setItems] = useState(data);
                    const [columnHash, setColumnHash] = useState('');
                    const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

                    const onSort = (newColumnHash, newDirection) => {
                      setColumnHash(newColumnHash);
                      setDirection(newDirection);
                      setItems((currentItems) => sort(currentItems, newColumnHash, newDirection));
                    };

                    return (
                      <Table
                        keyField="sku"
                        columns={[
                          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku, isSortable: true },
                          { header: 'Name', hash: 'name', render: ({ name }) => name, isSortable: true },
                          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock, isSortable: true },
                        ]}
                        items={items}
                        itemName="Products"
                        sortable={{
                          columnHash,
                          direction,
                          onSort,
                        }}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'table-figure',
              title: 'TableFigure',
              render: () => (
                <>
                  <Text>
                    <Code primary>TableFigure</Code> components are used to wrap tables and any relevant information to
                    be grouped with them. <Code primary>TableFigures</Code> also provide a scrollable overflow on mobile
                    for tables with large amounts of data. Try removing the <Code primary>TableFigure</Code> component
                    below in mobile view to see the differences.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <TableFigure>
                      <Table
                        columns={[
                          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
                          { header: 'Name', hash: 'name', render: ({ name }) => name },
                          { header: 'Description', hash: 'description', render: ({ description }) => description },
                        ]}
                        items={[
                          {
                            sku: 'SM13',
                            name: '[Sample] Smith Journal 13',
                            description:
                              'Volume 13 of Smith Journal is crammed with more than its fair share of sharp minds. Top of the list would have to be Solomon Shereshevsky, who remembered every single thing he’d ever come across – a great skill to have when it came to party tricks, but enough to send him crackers. And then there’s Delbert Trew who spends more time than you can imagine thinking about something very sharp indeed: barbed wire. You can’t go past Samuel Morse, either, who was a famous portrait painter before he gave his name to the code he invented. What a genius! And we’re pretty taken with Noel Turner, who was smart enough to get around some pretty weird New Zealand laws to invent a car that, for a while, was a huge success. As well, you’ll find stories on a cross-dressing spy, a couple of Sydney nerds who revolutionised modern music, court illustration, big wheels, the dubious science of controlling the weather and a whole stack of other stuff.',
                          },
                          {
                            sku: 'DPB',
                            name: '	[Sample] Dustpan & Brush',
                            description:
                              'A seemingly simple dustpan with a few features to make life easier. The arch and length of the dustpan eases cleanup, the wood turned handle provides firm grip and the rubber liner along the edge of the scoop will retrieve small crumbs with a single swipe. A key ring at the top makes storage a cinch - hang it off a broom closet hook when not in use.',
                          },
                        ]}
                        stickyHeader
                      />
                      <Small marginTop="xSmall">Helpful text to be grouped with the table</Small>
                    </TableFigure>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'custom',
              title: 'Custom',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Table
                    columns={[
                      { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
                      {
                        header: 'Name',
                        hash: 'name',
                        render: ({ name }) => name,
                        align: 'center',
                      },
                      {
                        header: 'Stock',
                        hash: 'stock',
                        render: ({ stock }) =>
                          stock > 5 ? <Text color="success">{stock}</Text> : <Text color="danger">{stock}</Text>,
                      },
                    ]}
                    items={[
                      { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
                      { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
                      { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
                      { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
                      { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
                    ]}
                  />
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'drag-and-drop',
              title: 'Drag & Drop',
              render: () => (
                <CodePreview scope={{ data, dragEnd }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [items, setItems] = useState(data);

                    const onDragEnd = (from: number, to: number) =>
                      setItems((currentItems) => dragEnd(currentItems, from, to));

                    return (
                      <Table
                        columns={[
                          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
                          { header: 'Name', hash: 'name', render: ({ name }) => name },
                          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
                        ]}
                        items={items}
                        onRowDrop={onDragEnd}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'table',
              title: 'Table',
              render: () => <TablePropTable renderPanel={false} />,
            },
            {
              id: 'columns',
              title: 'Columns',
              render: () => <TableColumnsPropTable id="table-columns-prop-table" renderPanel={false} />,
            },
            {
              id: 'selectable',
              title: 'Selectable',
              render: () => <TableSelectablePropTable id="table-selectable-prop-table" renderPanel={false} />,
            },
            {
              id: 'sortable',
              title: 'Sortable',
              render: () => <TableSortablePropTable id="table-sortable-prop-table" renderPanel={false} />,
            },
            {
              id: 'table-figure',
              title: 'TableFigure',
              render: () => <TableFigurePropTable renderPanel={false} />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            'Keep column headers to one or two words.',
            'Add pagination controls if the user is likely to have 5+ rows of data to view.',
          ]}
          discouraged={[
            <>
              Don’t use this when you need to have complex interactions (e.g. filter) with the data in the{' '}
              <Code primary>Table</Code>.
            </>,
            <>
              Don’t put unrelated objects in the same <Code primary>Table</Code>.
            </>,
            <>
              If using <Code primary>Table</Code>s in cramped places like modals, avoid placing too many columns.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default TablePage;
