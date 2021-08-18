import { H1, Panel, StatefulTree, Worksheet } from '@bigcommerce/big-design';
import React from 'react';

import { WorksheetColumn } from '../../../big-design/src/components/Worksheet/types';
import { CodePreview, PageNavigation } from '../../components';
import {
  WorksheetCheckboxColumnPropTable,
  WorksheetErrorPropTable,
  WorksheetModalColumnPropTable,
  WorksheetModalConfigPropTable,
  WorksheetNumberColumnPropTable,
  WorksheetPropTable,
  WorksheetSelectableColumnPropTable,
  WorksheetSelectableConfigPropTable,
  WorksheetTextColumnPropTable,
} from '../../PropTables';

interface Product {
  id: number;
  productName: string;
  isVisible: boolean;
  otherField: string;
  otherField2: string;
  otherField3: number;
  numberField: number;
}

const CATEGORIES = {
  0: 'Category 0',
  1: 'Category 1',
  2: 'Category 2',
  3: 'Category 3',
  4: 'Category 4',
  5: 'Category 5',
  6: 'Category 6',
  7: 'Category 7',
  8: 'Category 8',
  9: 'Category 9',
};

const nodes = [
  {
    id: '0',
    value: 0,
    label: 'Category 0',
    children: [
      {
        id: '5',
        value: 5,
        label: 'Category 5',
        children: [{ id: '9', value: 9, label: 'Category 9' }],
      },
    ],
  },
  {
    id: '1',
    value: 1,
    label: 'Category 1',
    children: [{ id: '6', value: 6, label: 'Category 6' }],
  },
  { id: '2', value: 2, label: 'Category 2' },
  {
    id: '3',
    value: 3,
    label: 'Category 3',
    children: [{ id: '7', value: 7, label: 'Category 7' }],
  },
  { id: '4', value: 4, label: 'Category 4', children: [{ id: '8', value: 8, label: 'Category 8' }] },
];

const CategoryTree = (value, onChange) => {
  return (
    <StatefulTree
      defaultExpanded={['0', '5', '1']}
      defaultSelected={[String(value)]}
      disabledNodes={['1']}
      nodes={nodes}
      onSelectionChange={(selectedNodes) => onChange(selectedNodes[0])}
      selectable="radio"
    />
  );
};

const WorksheetPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <CodePreview scope={{ CATEGORIES, CategoryTree, nodes }}>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Product>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  { hash: 'isVisible', header: 'Visible', type: 'checkbox' },
                  { hash: 'otherField', header: 'Other field' },
                  {
                    hash: 'otherField2',
                    header: 'Other field',
                    type: 'select',
                    config: {
                      options: [
                        { value: 'option-1', content: 'Option 1' },
                        { value: 'option-2', content: 'Option 2' },
                        { value: 'option-3', content: 'Option 3' },
                      ],
                    },
                    validation: (value) => !!value,
                  },
                  {
                    hash: 'otherField3',
                    header: 'Category',
                    type: 'modal',
                    config: {
                      header: 'Choose categories',
                      render: CategoryTree,
                    },
                    formatting: (value: number) => CATEGORIES[value],
                  },
                  {
                    hash: 'numberField',
                    header: 'Number field',
                    type: 'number',
                    formatting: (value: number) => `$${value}.00`,
                    validation: (value: number) => typeof value === 'number' && !Number.isNaN(value),
                  },
                ];

                const items: Product[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-1',
                    otherField3: 2,
                    numberField: 50,
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-1',
                    otherField3: 6,
                    numberField: 50,
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    isVisible: false,
                    otherField: 'Text',
                    otherField2: 'option-2',
                    otherField3: 8,
                    numberField: 50,
                  },
                  {
                    id: 4,
                    productName: 'Variant 1',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-2',
                    otherField3: 9,
                    numberField: 50,
                  },
                  {
                    id: 5,
                    productName: '',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: '',
                    otherField3: 4,
                    numberField: 50,
                  },
                  {
                    id: 6,
                    productName: 'Variant 3',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: '',
                    otherField3: 3,
                    numberField: 50,
                  },
                  {
                    id: 7,
                    productName: 'Variant 4',
                    isVisible: false,
                    otherField: 'Text',
                    otherField2: 'option-2',
                    otherField3: 4,
                    numberField: 50,
                  },
                  {
                    id: 8,
                    productName: 'Product 4',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-2',
                    otherField3: 7,
                    numberField: 50,
                  },
                  {
                    id: 9,
                    productName: 'Product 5',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-2',
                    otherField3: 3,
                    numberField: 50,
                  },
                  {
                    id: 10,
                    productName: 'Product 6',
                    isVisible: true,
                    otherField: 'Text',
                    otherField2: 'option-3',
                    otherField3: 3,
                    numberField: 50,
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Text columns">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  { hash: 'otherField', header: 'Other field' },
                ];

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    otherField: 'Text',
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    otherField: 'Text',
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    otherField: 'Text',
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Number columns">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<{ id: number; cost: number; stock: number }>[] = [
                  {
                    hash: 'cost',
                    header: 'Cost',
                    type: 'number',
                    formatting: (value: number) => `$${value}.00`,
                    validation: (value: number) => typeof value === 'number' && !Number.isNaN(value),
                  },
                  {
                    hash: 'stock',
                    header: 'Stock',
                    type: 'number',
                    validation: (value: number) => typeof value === 'number' && !Number.isNaN(value),
                  },
                ];

                const items: { id: number; cost: number; stock: number }[] = [
                  {
                    id: 1,
                    cost: 100,
                    stock: 3,
                  },
                  {
                    id: 2,
                    cost: 200,
                    stock: 10,
                  },
                  {
                    id: 3,
                    cost: 300,
                    stock: 5,
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Checkbox columns">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  { hash: 'isVisible', header: 'Visible', type: 'checkbox' },
                ];

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    isVisible: true,
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    isVisible: false,
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    isVisible: false,
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Selectable columns">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  {
                    hash: 'otherField2',
                    header: 'Other field',
                    type: 'select',
                    config: {
                      options: [
                        { value: 'option-1', content: 'Option 1' },
                        { value: 'option-2', content: 'Option 2' },
                        { value: 'option-3', content: 'Option 3' },
                      ],
                    },
                    validation: (value) => !!value,
                  },
                ];

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    otherField2: 'option-1',
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    otherField2: 'option-2',
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    otherField2: 'option-3',
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Modal columns">
            <CodePreview scope={{ CATEGORIES, CategoryTree, nodes }}>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  {
                    hash: 'otherField3',
                    header: 'Category',
                    type: 'modal',
                    config: {
                      header: 'Choose categories',
                      render: CategoryTree,
                    },
                    formatting: (value: number) => CATEGORIES[value],
                  },
                ];

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    otherField3: 1,
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    otherField3: 2,
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    otherField3: 3,
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Disabled columns">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  { hash: 'otherField', header: 'Other field', disabled: true },
                ];

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    otherField: 'Text',
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    otherField: 'Text',
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    otherField: 'Text',
                  },
                ];

                return (
                  <Worksheet columns={columns} items={items} onChange={(items) => items} onErrors={(items) => items} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Expandable rows">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const columns: WorksheetColumn<Partial<Product>>[] = [
                  { hash: 'productName', header: 'Product name', validation: (value) => !!value },
                  { hash: 'otherField', header: 'Other field', disabled: true },
                ];

                const expandableRows = {
                  2: [3],
                  4: [5, 6],
                };

                const items: Partial<Product>[] = [
                  {
                    id: 1,
                    productName: 'Product 1',
                    otherField: 'Text',
                  },
                  {
                    id: 2,
                    productName: 'Product 2',
                    otherField: 'Text',
                  },
                  {
                    id: 3,
                    productName: 'Product 3',
                    otherField: 'Text',
                  },
                  {
                    id: 4,
                    productName: 'Product 4',
                    otherField: 'Text',
                  },
                  {
                    id: 5,
                    productName: 'Product 5',
                    otherField: 'Text',
                  },
                  {
                    id: 6,
                    productName: 'Product 6',
                    otherField: 'Text',
                  },
                  {
                    id: 7,
                    productName: 'Product 7',
                    otherField: 'Text',
                  },
                ];

                return (
                  <Worksheet
                    columns={columns}
                    expandableRows={expandableRows}
                    items={items}
                    onChange={(items) => items}
                    onErrors={(items) => items}
                  />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => (
        <>
          <WorksheetPropTable />
          <WorksheetTextColumnPropTable id="worksheet-text-column-prop-table" />
          <WorksheetNumberColumnPropTable id="worksheet-number-column-prop-table" />
          <WorksheetCheckboxColumnPropTable id="worksheet-checkbox-column-prop-table" />
          <WorksheetSelectableColumnPropTable id="worksheet-selectable-column-prop-table" />
          <WorksheetModalColumnPropTable id="worksheet-modal-column-prop-table" />
          <WorksheetSelectableConfigPropTable id="worksheet-selectable-config-prop-table" />
          <WorksheetModalConfigPropTable id="worksheet-modal-config-prop-table" />
          <WorksheetErrorPropTable id="worksheet-error-prop-table" />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>Worksheet</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default WorksheetPage;
