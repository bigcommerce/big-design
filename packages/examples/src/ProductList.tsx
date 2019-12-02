import React from 'react';
import {
  Button,
  H1,
  Panel,
  StatefulTable,
  Text,
  TableFigure
} from '@bigcommerce/big-design';
import { Product } from './data';
import { DeleteIcon } from '@bigcommerce/big-design-icons';

interface Props {
  products: Product[];
  onDelete(product: Product): void;
}

export const ProductList: React.FC<Props> = ({ onDelete, products }) => {
  const renderStockColumn = ({ stock }: Product) =>
    stock === 0 ? <Text color="danger">{stock}</Text> : <Text>{stock}</Text>;

  const renderOnDelete = (product: Product) => (
    <Button
      variant="subtle"
      onClick={() => onDelete(product)}
      iconOnly={<DeleteIcon title="Delete Product" color="danger40" />}
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
                render: ({ category }) => category
              },
              {
                header: 'Stock',
                hash: 'stock',
                align: 'right',
                render: renderStockColumn,
                sortKey: 'stock'
              },
              {
                header: '',
                align: 'right',
                hash: 'actions',
                render: renderOnDelete
              }
            ]}
            items={products}
            stickyHeader
          />
        </TableFigure>
      </Panel>
    </>
  );
};
