import { Button, H1, Panel, StatefulTable, TableFigure, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Product } from './data';

interface Props {
  readonly products: Product[];
  onDelete(product: Product): void;
}

export const ProductList: React.FC<Props> = ({ onDelete, products }) => {
  const renderStockColumn = ({ stock }: Product) =>
    stock === 0 ? <Text color="danger">{stock}</Text> : <Text>{stock}</Text>;

  const renderOnDelete = (product: Product) => (
    <Button
      actionType="destructive"
      iconOnly={<DeleteIcon title="Delete Product" />}
      onClick={() => onDelete(product)}
      variant="subtle"
    />
  );

  return (
    <>
      <H1 marginTop="xxLarge">Product List</H1>
      <Panel>
        <TableFigure>
          <StatefulTable
            columns={[
              { header: 'Name', hash: 'name', render: ({ name }) => name },
              {
                header: 'Category',
                hash: 'category',
                render: ({ category }) => category,
              },
              {
                header: 'Stock',
                hash: 'stock',
                align: 'right',
                render: renderStockColumn,
                sortKey: 'stock',
              },
              {
                header: '',
                align: 'right',
                hash: 'actions',
                render: renderOnDelete,
              },
            ]}
            items={products}
            stickyHeader
          />
        </TableFigure>
      </Panel>
    </>
  );
};
