import { H0, H1, Small, Table, TableFigure, TableItem, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview } from '../../components';
import {
  TableColumnsPropTable,
  TablePropTable,
  TableSelectablePropTable,
  TableSortablePropTable,
} from '../../PropTables';

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

const TablePage = () => {
  return (
    <>
      <H0>Table</H0>

      <CodePreview>
        {/* jsx-to-string:start */}
        <Table
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
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

      <H1>API</H1>
      <TablePropTable />
      <TableColumnsPropTable id="table-columns-prop-table" />
      <TableSelectablePropTable id="table-selectable-prop-table" />
      <TableSortablePropTable id="table-sortable-prop-table" />

      <H1>Usage with selectable</H1>

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

      <H1>Usage with pagination</H1>

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
      <H1>Usage with sortable</H1>

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

      <H1>Usage with TableFigure</H1>

      <Text>
        TableFigure components are used to wrap Tables and any relevant information to be grouped with them.
        TableFigures also provide a scrollable overflow on mobile for Tables with large amounts of data. Try removing
        the TableFigure component below in mobile view to see the differences.
      </Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <>
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
                  name: 'Item 1',
                  description:
                    'Yar Pirate Ipsum Lee Buccaneer Gold Road bilge water nipperkin hogshead ye. Spanish Main belay parrel fore schooner haul wind flogging. Sutler maroon list warp scourge of the seven seas Gold Road knave. Ballast fluke cog jolly boat landlubber or just lubber tack no prey, no pay.',
                },
                {
                  sku: 'DPB',
                  name: 'Item 2',
                  description:
                    'Yar Pirate Ipsum Lee Buccaneer Gold Road bilge water nipperkin hogshead ye. Spanish Main belay parrel fore schooner haul wind flogging. Sutler maroon list warp scourge of the seven seas Gold Road knave. Ballast fluke cog jolly boat landlubber or just lubber tack no prey, no pay.',
                },
              ]}
              stickyHeader
            />
            <Small marginTop="xSmall">Helpful text to be grouped with the table</Small>
          </TableFigure>
        </>
        {/* jsx-to-string:end */}
      </CodePreview>

      <Text>
        TableFigure supports all native <Code>&lt;figure /&gt;</Code> element attributes.
      </Text>

      <H1>Customization Example</H1>

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
    </>
  );
};

export default TablePage;
