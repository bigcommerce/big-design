import { H0, H1, H2, StatefulTable, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, NextLink } from '../../components';
import { StatefulTableColumnsPropTable, StatefulTableFiltersPropTable, StatefulTablePropTable } from '../../PropTables';

const items = [
  { sku: '3137737c', name: 'Rice - Wild', stock: 29 },
  { sku: 'd23bfc4c', name: 'Wine - Rioja Campo Viejo', stock: 5 },
  { sku: 'cb8ca0f9', name: 'Wine - Baron De Rothschild', stock: 17 },
  { sku: '3951a57f', name: 'Steampan - Foil', stock: 30 },
  { sku: '04f48630', name: 'Nut - Walnut, Pieces', stock: 11 },
  { sku: '38392ba4', name: 'Wine - Conde De Valdemar', stock: 8 },
  { sku: '134b820c', name: 'Pepper - Chili Powder', stock: 35 },
  { sku: 'b0aeabb4', name: 'Broom And Brush Rack Black', stock: 16 },
  { sku: '70e8a5a7', name: 'Cardamon Ground', stock: 26 },
  { sku: '8371ad15', name: 'Tamarillo', stock: 10 },
  { sku: '3ddfe9d4', name: 'Sardines', stock: 19 },
  { sku: '64bb2c0d', name: 'Steam Pan - Half Size Deep', stock: 30 },
  { sku: '5d63640f', name: 'Yeast - Fresh, Fleischman', stock: 26 },
  { sku: '1c7f113e', name: 'Table Cloth 81x81 Colour', stock: 24 },
  { sku: '5d18a49a', name: 'Baking Soda', stock: 24 },
  { sku: 'b1ac58c4', name: 'Red Snapper - Fresh, Whole', stock: 23 },
  { sku: '358a6371', name: 'Chips Potato All Dressed - 43g', stock: 18 },
  { sku: '964d3d8c', name: 'Cream Of Tartar', stock: 3 },
  { sku: '673f56ca', name: 'Muffin Batt - Blueberry Passion', stock: 28 },
  { sku: 'a358ab58', name: 'Puree - Kiwi', stock: 25 },
  { sku: 'e17535d0', name: 'Beer - Creemore', stock: 26 },
  { sku: '6b3d83b1', name: 'Goulash Seasoning', stock: 30 },
  { sku: '4e7a378d', name: 'Beef - Striploin Aa', stock: 9 },
  { sku: '5ed9e628', name: 'Beer - Maudite', stock: 21 },
  { sku: '147728a2', name: 'Beans - Kidney, Red Dry', stock: 31 },
  { sku: 'f8690bd1', name: 'Cheese - Brick With Onion', stock: 19 },
  { sku: '45a4878d', name: 'Grenadillo', stock: 1 },
  { sku: '4ed3bbfd', name: 'Stock - Beef, Brown', stock: 16 },
  { sku: 'b229deb6', name: 'Soup Campbells Turkey Veg.', stock: 2 },
  { sku: 'b0b10316', name: 'Juice - Happy Planet', stock: 16 },
  { sku: '38e8b7e8', name: 'Tofu - Soft', stock: 13 },
  { sku: '8030a286', name: 'Cake - Lemon Chiffon', stock: 19 },
  { sku: '3b7a1aa1', name: 'Appetizer - Escargot Puff', stock: 15 },
  { sku: '12dc80f4', name: 'Grenadine', stock: 1 },
  { sku: '762803b1', name: 'Sauce - Bernaise, Mix', stock: 1 },
  { sku: '202df318', name: 'Steam Pan - Half Size Deep', stock: 14 },
  { sku: '2096e4e3', name: 'Tequila - Sauza Silver', stock: 33 },
  { sku: '7401e1fd', name: 'Coffee - Flavoured', stock: 21 },
  { sku: 'e16260a8', name: 'Veal - Slab Bacon', stock: 1 },
  { sku: '2cdbe616', name: 'Wonton Wrappers', stock: 14 },
  { sku: '2fb211e8', name: 'Bread - Malt', stock: 33 },
  { sku: '88c3cfe7', name: 'Sugar - Cubes', stock: 17 },
  { sku: '0c7de951', name: 'Cookie Trail Mix', stock: 5 },
  { sku: '915867e1', name: 'Chinese Foods - Chicken Wing', stock: 31 },
  { sku: 'a72f791f', name: 'Buffalo - Tenderloin', stock: 23 },
  { sku: 'a0dd1467', name: 'Pastry - French Mini Assorted', stock: 24 },
  { sku: 'fac53a91', name: 'Wine - Stoneliegh Sauvignon', stock: 25 },
  { sku: '4bb2916d', name: 'Sugar - Palm', stock: 20 },
  { sku: '573bf5e3', name: 'Beer - Camerons Auburn', stock: 21 },
  { sku: 'b16e6a30', name: 'Cucumber - Pickling Ontario', stock: 10 },
  { sku: '9a9313d3', name: 'Beef - Short Ribs', stock: 16 },
  { sku: '267cc895', name: 'Beer - Fruli', stock: 8 },
  { sku: '2ea62a23', name: 'Octopus', stock: 8 },
  { sku: '67b803a4', name: 'Cherries - Maraschino,jar', stock: 17 },
  { sku: '5ae8f844', name: 'Sherbet - Raspberry', stock: 11 },
  { sku: 'be06efaa', name: 'Rice Pilaf, Dry,package', stock: 5 },
  { sku: '8f56d3e1', name: 'Foil Cont Round', stock: 27 },
  { sku: '2be4e147', name: 'Milk - Chocolate 500ml', stock: 7 },
  { sku: 'afba0e3a', name: 'Veal - Inside', stock: 3 },
  { sku: 'bee8a490', name: 'Jolt Cola', stock: 36 },
  { sku: 'f95c3876', name: 'Coffee - Hazelnut Cream', stock: 28 },
  { sku: 'c9c10646', name: 'Brandy Apricot', stock: 15 },
  { sku: '910c9f96', name: 'Peppercorns - Green', stock: 20 },
  { sku: '593507e5', name: 'Browning Caramel Glace', stock: 24 },
  { sku: '3a0bbebf', name: 'Halibut - Fletches', stock: 35 },
  { sku: '7d811897', name: 'Lid Coffeecup 12oz D9542b', stock: 33 },
  { sku: '43a128ca', name: 'Oil - Hazelnut', stock: 18 },
  { sku: 'bbcab107', name: 'Saskatoon Berries - Frozen', stock: 24 },
  { sku: 'd046d959', name: 'Soup - Campbells, Chix Gumbo', stock: 16 },
  { sku: 'b2b0531c', name: 'Rum - Spiced, Captain Morgan', stock: 1 },
  { sku: '5425fd56', name: 'Wine - Riesling Dr. Pauly', stock: 35 },
  { sku: '046d807e', name: 'Skirt - 29 Foot', stock: 27 },
  { sku: 'd109ada7', name: 'Ham - Virginia', stock: 22 },
  { sku: 'ddd11eee', name: 'Pomegranates', stock: 9 },
  { sku: '8a7f119d', name: 'Lidsoupcont Rp12dn', stock: 25 },
  { sku: '85559c3a', name: 'Quail - Jumbo', stock: 20 },
  { sku: 'f2e1dafc', name: 'Cheese - Brie Roitelet', stock: 26 },
  { sku: 'ac35dd42', name: 'Tomatoes - Roma', stock: 35 },
  { sku: '2806465d', name: 'Oven Mitt - 13 Inch', stock: 21 },
  { sku: 'f1dc1d8f', name: 'Samosa - Veg', stock: 13 },
  { sku: '61c4fba7', name: 'Loquat', stock: 20 },
  { sku: 'a0865469', name: 'Ice Cream Bar - Rolo Cone', stock: 32 },
  { sku: '3d84f8b3', name: 'Cherries - Bing, Canned', stock: 18 },
  { sku: '592e5f21', name: 'Juice - Apple, 500 Ml', stock: 11 },
  { sku: '8d345eea', name: 'Chinese Lemon Pork', stock: 26 },
  { sku: '2947c625', name: 'Bread - Frozen Basket Variety', stock: 33 },
  { sku: '8d8144ce', name: 'Paper Towel Touchless', stock: 14 },
  { sku: '543a0480', name: 'Onions - Cooking', stock: 36 },
  { sku: '24a5c0bc', name: 'Lettuce - Romaine', stock: 17 },
  { sku: '8e8b22bf', name: 'Spinach - Frozen', stock: 19 },
  { sku: '1477f081', name: 'Zucchini - Yellow', stock: 13 },
  { sku: 'f3d638f6', name: 'Wild Boar - Tenderloin', stock: 3 },
  { sku: '90f71f26', name: 'Rice - Wild', stock: 26 },
  { sku: '3c275810', name: 'Wine - Fino Tio Pepe Gonzalez', stock: 2 },
  { sku: '2e11de76', name: 'Petit Baguette', stock: 5 },
  { sku: '8e6cb56a', name: 'Clams - Littleneck, Whole', stock: 28 },
  { sku: '5450b12a', name: 'Squid - U 5', stock: 12 },
  { sku: '96043b83', name: 'Wine - Red, Wolf Blass, Yellow', stock: 20 },
  { sku: '87c85429', name: 'Cheese - Cambozola', stock: 36 },
  { sku: 'be1652e5', name: 'Wine - Cahors Ac 2000, Clos', stock: 21 },
];

const StatefulTablePage = () => {
  return (
    <>
      <H0>StatefulTable</H0>

      <Text>
        StatefulTable is a wrapper of{' '}
        <NextLink href="/Table/TablePage" as="/table">
          Table
        </NextLink>{' '}
        that simplifies it's usage when having the full list of items in memory. It supports pagination, row selection,
        and sorting out of the box.
      </Text>

      <CodePreview>
        {/* jsx-to-string:start */}
        <StatefulTable
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
      <StatefulTablePropTable />
      <StatefulTableColumnsPropTable id="stateful-table-columns-prop-table" />
      <StatefulTableFiltersPropTable id="stateful-table-filters-prop-table" />

      <H1>Examples</H1>
      <H2>Usage with pagination, selection, and sorting.</H2>

      <CodePreview scope={{ items }}>
        {/* jsx-to-string:start */}
        <StatefulTable
          itemName="Products"
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock, sortKey: 'stock' },
          ]}
          items={items}
          pagination
          selectable
          stickyHeader
        />
        {/* jsx-to-string:end */}
      </CodePreview>

      <H2>Usage with drag and drop</H2>

      <CodePreview>
        {/* jsx-to-string:start */}
        <StatefulTable
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
          onRowDrop={() => null}
        />
        {/* jsx-to-string:end */}
      </CodePreview>

      <H2>Usage with filters</H2>

      <CodePreview>
        {/* jsx-to-string:start */}
        <StatefulTable
          columns={[
            { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
            { header: 'Name', hash: 'name', render: ({ name }) => name },
            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
          ]}
          items={[
            { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
            { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
            { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 0 },
            { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
            { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
          ]}
          filters={{
            filter: (pillId, items) =>
              pillId === 'low_stock'
                ? items.filter((item) => item.stock !== 0 && item.stock < 10)
                : items.filter((item) => item.stock === 0),
            pillTabs: [
              {
                id: 'low_stock',
                title: 'Low Stock',
              },
              {
                id: 'out_of_stock',
                title: 'Out of Stock',
              },
            ],
          }}
        />
        {/* jsx-to-string:end */}
      </CodePreview>

      <H2>Usage with search</H2>

      <CodePreview scope={{ items }}>
        {/* jsx-to-string:start */}
        {function Example() {
          return (
            <StatefulTable
              itemName="Products"
              columns={[
                { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
                { header: 'Name', hash: 'name', render: ({ name }) => name },
                { header: 'Stock', hash: 'stock', render: ({ stock }) => stock, sortKey: 'stock' },
              ]}
              items={items}
              pagination
              stickyHeader
              search
            />
          );
        }}
        {/* jsx-to-string:end */}
      </CodePreview>
    </>
  );
};

export default StatefulTablePage;
