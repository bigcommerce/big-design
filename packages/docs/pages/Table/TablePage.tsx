import { H0, H1, Table, TableItem, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
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
  { sku: 'OTL', name: '[Sample] Orbit Terrarium - Large', stock: 109 },
  { sku: 'OTS', name: '[Sample] Orbit Terrarium - Small', stock: 89 },
  { sku: 'SLCTBS', name: '[Sample] Fog Linen Chambray Towel - Beige Stripe with some fondu of some sort', stock: 49 },
  { sku: 'SLLPJ', name: '[Sample] 1 L Le Parfait Jar', stock: 7 },
  { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
  { sku: 'TWB', name: '[Sample] Tiered Wire Basket', stock: 119 },
];

const columns = [
  { header: 'Sku', hash: 'sku', render: ({ sku }) => sku, isSortable: true },
  { header: 'Name', hash: 'name', render: ({ name }) => name },
  { header: 'Stock', hash: 'stocck', render: ({ stock }) => stock },
];

const sort = (items, columnHash, direction) => {
  return items
    .concat()
    .sort((a, b) =>
      direction === 'ASC' ? (a[columnHash] >= b[columnHash] ? 1 : -1) : a[columnHash] <= b[columnHash] ? 1 : -1,
    );
};

export default () => {
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
        />
        {/* jsx-to-string:end */}
      </CodePreview>

      <H1>API</H1>
      <TablePropTable />
      <TableColumnsPropTable id="table-columns-prop-table" />
      <TableSelectablePropTable id="table-selectable-prop-table" />
      <TableSortablePropTable id="table-sortable-prop-table" />

      <H1>Using pagination and selectable</H1>

      <CodePreview scope={{ data, columns, sort }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const [items, setItems] = React.useState(data);

          // Pagination
          const [ranges] = React.useState([10, 20, 30]);
          const [range, setRange] = React.useState(ranges[0]);
          const [page, setPage] = React.useState(1);
          const [currentItems, setCurrentItems] = React.useState([]);

          // Selectable
          const [selectedItems, setSelectedItems] = React.useState([]);

          // Sortable
          const [sortDirection, setSortDirection] = React.useState('ASC');

          const onItemsPerPageChange = newRange => {
            setPage(1);
            setRange(newRange);
          };

          const onPageChange = newPage => {
            setSelectedItems([]);
            setPage(newPage);
          };

          React.useEffect(() => {
            const maxItems = page * range;
            const lastItem = Math.min(maxItems, items.length);
            const firstItem = Math.max(0, maxItems - range);

            // @ts-ignore
            setCurrentItems(items.slice(firstItem, lastItem));
          }, [page, items, range]);

          const onSort = (columnHash, direction) => {
            const sortedItems = sort(items, columnHash, direction);
            setSortDirection(direction);
            setItems(sortedItems);
          };

          return (
            <Table
              stickyHeader
              keyField="sku"
              columns={columns}
              items={currentItems}
              itemName="Products"
              selectable={{
                onSelectionChange: setSelectedItems,
                selectedItems,
              }}
              pagination={{
                currentPage: page,
                totalItems: items.length,
                onPageChange,
                itemsPerPageOptions: ranges,
                onItemsPerPageChange,
                itemsPerPage: range,
              }}
              // @ts-ignore
              sortable={{
                columnHash: 'sku',
                direction: sortDirection,
                onSort,
              }}
            />
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>

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
