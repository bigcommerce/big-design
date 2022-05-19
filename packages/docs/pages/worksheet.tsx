/* eslint-disable @typescript-eslint/naming-convention */
import { H1, Panel, StatefulTree, Text, Worksheet, WorksheetColumn } from '@bigcommerce/big-design';
import React from 'react';

import {
  Code,
  CodePreview,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
  NextLink,
} from '../components';
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
} from '../PropTables';

interface Product {
  id: number;
  productName: string;
  isVisible: boolean;
  otherField: string;
  otherField2: string;
  otherField3: number;
  numberField: number;
}

interface Category {
  [x: number]: string;
}

const CATEGORIES: Category = {
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
  {
    id: '4',
    value: 4,
    label: 'Category 4',
    children: [{ id: '8', value: 8, label: 'Category 8' }],
  },
];

const CategoryTree = (value, onChange) => {
  return (
    <StatefulTree
      defaultExpanded={['0', '5', '1']}
      defaultSelected={[String(value)]}
      disabledNodes={['1']}
      nodes={nodes}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      onSelectionChange={(selectedNodes) => onChange(selectedNodes[0])}
      selectable="radio"
    />
  );
};

const WorksheetPage = () => {
  return (
    <>
      <H1>Worksheet</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Worksheet</Code> displays information about a collection of objects and
          allow the merchant to manage and edit object data.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            To display and edit information across a large data set (e.x. products, customers,
            inventory, price lists).
          </List.Item>
          <List.Item>
            To quickly scan and compare information in order to identify patterns, transform data,
            or augment with additional details.
          </List.Item>
          <List.Item>
            Unlike <Code primary>Tables</Code>, a <Code primary>Worksheet</Code> component is
            actionable and interactive and should be used in situations where editing is the primary
            purpose.
          </List.Item>
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
                <CodePreview key="basic" scope={{ CATEGORIES, CategoryTree, nodes }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Product>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
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
                        validation: (value: number) =>
                          typeof value === 'number' && !Number.isNaN(value),
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'text-columns',
              title: 'Text columns',
              render: () => (
                <CodePreview key="text-columns">
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
                      { hash: 'otherField', header: 'Other field' },
                    ];

                    const items: Array<Partial<Product>> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'number-columns',
              title: 'Number columns',
              render: () => (
                <CodePreview key="number-columns" scope={{ CATEGORIES, CategoryTree, nodes }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<
                      WorksheetColumn<{ id: number; cost: number; stock: number }>
                    > = [
                      {
                        hash: 'cost',
                        header: 'Cost',
                        type: 'number',
                        formatting: (value: number) => `$${value}.00`,
                        validation: (value: number) =>
                          typeof value === 'number' && !Number.isNaN(value),
                      },
                      {
                        hash: 'stock',
                        header: 'Stock',
                        type: 'number',
                        validation: (value: number) =>
                          typeof value === 'number' && !Number.isNaN(value),
                      },
                    ];

                    const items: Array<{ id: number; cost: number; stock: number }> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'checkbox-columns',
              title: 'Checkbox columns',
              render: () => (
                <CodePreview key="checkbox-columns">
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
                      { hash: 'isVisible', header: 'Visible', type: 'checkbox' },
                    ];

                    const items: Array<Partial<Product>> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'selectable-columns',
              title: 'Selectable columns',
              render: () => (
                <CodePreview key="selectable-columns">
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
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

                    const items: Array<Partial<Product>> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'modal-columns',
              title: 'Modal columns',
              render: () => (
                <CodePreview key="modal-columns" scope={{ CATEGORIES, CategoryTree, nodes }}>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
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
                    ];

                    const items: Array<Partial<Product>> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'disabled-columns',
              title: 'Disabled columns',
              render: () => (
                <CodePreview key="disabled-columns">
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
                      { hash: 'otherField', header: 'Other field', disabled: true },
                    ];

                    const items: Array<Partial<Product>> = [
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
                      <Worksheet
                        columns={columns}
                        items={items}
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'expandable-rows',
              title: 'Expandable rows',
              render: () => (
                <CodePreview key="expandable-rows">
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const columns: Array<WorksheetColumn<Partial<Product>>> = [
                      {
                        hash: 'productName',
                        header: 'Product name',
                        validation: (value) => !!value,
                      },
                      { hash: 'otherField', header: 'Other field' },
                    ];

                    const expandableRows = {
                      2: [3],
                      4: [5, 6],
                    };

                    const items: Array<Partial<Product>> = [
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
                        onChange={(changeItems) => changeItems}
                        onErrors={(errorItems) => errorItems}
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
              id: 'worksheet',
              title: 'Worksheet',
              render: () => <WorksheetPropTable />,
            },
            {
              id: 'text-column',
              title: 'TextColumn',
              render: () => <WorksheetTextColumnPropTable id="worksheet-text-column-prop-table" />,
            },
            {
              id: 'number-column',
              title: 'NumberColumn',
              render: () => (
                <WorksheetNumberColumnPropTable id="worksheet-number-column-prop-table" />
              ),
            },
            {
              id: 'checkbox-column',
              title: 'CheckboxColumn',
              render: () => (
                <WorksheetCheckboxColumnPropTable id="worksheet-checkbox-column-prop-table" />
              ),
            },
            {
              id: 'selectable-column',
              title: 'SelectableColumn',
              render: () => (
                <WorksheetSelectableColumnPropTable id="worksheet-selectable-column-prop-table" />
              ),
            },
            {
              id: 'modal-column',
              title: 'ModalColumn',
              render: () => (
                <WorksheetModalColumnPropTable id="worksheet-modal-column-prop-table" />
              ),
            },
            {
              id: 'selectable-config',
              title: 'SelectableConfig',
              render: () => (
                <WorksheetSelectableConfigPropTable id="worksheet-selectable-config-prop-table" />
              ),
            },
            {
              id: 'modal-config',
              title: 'ModalConfig',
              render: () => (
                <WorksheetModalConfigPropTable id="worksheet-modal-config-prop-table" />
              ),
            },
            {
              id: 'error',
              title: 'Error',
              render: () => <WorksheetErrorPropTable id="worksheet-error-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Never use the <Code primary>Worksheet</Code> component to display a simple list of
              related content. Instead use a <NextLink href="/table">Table</NextLink>.
            </>,
            'Editing or actions should always be initiated directly on a cell.  Do not use the actions icon/menu.',
          ]}
          recommended={[
            <>
              Always display a <Code primary>Worksheet</Code> component with collapsed side
              navigation.
            </>,
            'Column header names should use sentence case, be concise and describe the type of content displayed in that column.',
            'Each row contains information related to a single entity.',
            'Each cell contains either a single data point or groups of data from a multi-select interaction (e.g. categories).',
            'Interactive elements per cell include: text/numerical input, subtle buttons which open a modal, checkboxes and drop downs.',
            <>
              Show the total number of items at the top of the <Code primary>Worksheet</Code>.
            </>,
            <>
              Use the <Code primary>Worksheet</Code> for bulk editing actions.
            </>,
            <>
              A <Code primary>Worksheet</Code> should always be on it’s own page. Never combine a
              worksheet with other tables or panels of content.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default WorksheetPage;
