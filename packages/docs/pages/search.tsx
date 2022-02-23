import { Box, H1, Panel, Search, Table, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, GuidelinesTable, List } from '../components';
import { SearchPropTable } from '../PropTables';

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
      <H1>Search</H1>

      <Panel header="Overview" headerId="overview">
        <Text>The search bar allows a user to easily find information within columns.</Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>To search a list or create filters within a table.</List.Item>
          <List.Item>Find specific information within a page.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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
                    { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
                    { header: 'Name', hash: 'name', render: ({ name }) => name },
                    { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
                  ]}
                  items={items}
                />
              </>
            );
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <SearchPropTable renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>Make the search bar easily noticable.</>,
            <>Always use a search icon within the input box to indicate search functionality.</>,
          ]}
          discouraged={[<>Avoid using a search bar when there is small, easily navigable amount of data on a page.</>]}
        />
      </Panel>
    </>
  );
};

export default SearchPage;
