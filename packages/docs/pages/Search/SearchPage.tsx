import { Box, H0, H1, Search, Table } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview } from '../../components';
import { SearchPropTable } from '../../PropTables';

const data = [
  { sku: 'ABS', name: '[Sample] Able Brewing System', stock: 225 },
  { sku: 'CC3C', name: '[Sample] Chemex Coffeemaker 3 cup', stock: 49 },
  { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
  { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
  { sku: 'OCG', name: '[Sample] Oak Cheese Grater', stock: 34 },
  { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
];

const SearchPage = () => {
  return (
    <>
      <H0>Search</H0>

      <CodePreview scope={{ data }}>
        {/* jsx-to-string:start */}
        {function Example() {
          const [items, setItems] = useState(data);
          const [searchValue, setSearchValue] = useState('');
          const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

          const onSubmit = () => {
            setItems((prevItems) => {
              if (searchValue) {
                return prevItems.filter((item) => item.name.includes(searchValue));
              }

              return data;
            });
          };

          return (
            <>
              <Box marginBottom="medium">
                <Search value={searchValue} onChange={onChange} onSubmit={onSubmit} />
              </Box>
              <Table
                columns={[
                  { header: 'Sku', hash: 'sku', render: ({ sku }) => sku, isSortable: true },
                  { header: 'Name', hash: 'name', render: ({ name }) => name, isSortable: true },
                  { header: 'Stock', hash: 'stock', render: ({ stock }) => stock, isSortable: true },
                ]}
                items={items}
              />
            </>
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>

      <H1>API</H1>
      <SearchPropTable />
    </>
  );
};

export default SearchPage;
