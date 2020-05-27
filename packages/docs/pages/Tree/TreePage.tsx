import { H0, H1, H2, Message, Text, Tree, TreeNodeProps } from '@bigcommerce/big-design';
import { AssignmentIcon, LanguageIcon, StoreIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { TreeNodePropTable, TreePropTable } from '../../PropTables';

const TabsPage = () => (
  <>
    <H0>Tree</H0>

    <Text>
      The <Code primary>Tree</Code> component is used to display a tree of items. Useful for defining a tree of
      categories or subcollections.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const nodes = [
          {
            id: 0,
            value: 0,
            label: 'Category',
            expanded: true,
            children: [
              {
                id: 5,
                value: 5,
                expanded: true,
                selected: true,
                label: 'Category',
                children: [{ id: 9, value: 9, label: 'Category' }],
              },
            ],
          },
          {
            id: 1,
            value: 1,
            label: 'Category',
            disabled: true,
            expanded: true,
            children: [{ id: 6, value: 6, label: 'Category' }],
          },
          { id: 2, value: 2, label: 'Category' },
          { id: 3, value: 3, label: 'Category', selected: true, children: [{ id: 7, value: 7, label: 'Category' }] },
          { id: 4, value: 4, label: 'Category', children: [{ id: 8, value: 8, label: 'Category' }] },
        ];

        return <Tree selectable="multi" nodes={nodes} />;
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <TreePropTable />
    <TreeNodePropTable id="tree-node-prop-table" />

    <H1>Examples</H1>

    <H2>Radio</H2>
    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const nodes = [
          {
            id: 0,
            value: 0,
            label: 'Category',
            expanded: true,
            disabled: true,
            children: [{ id: 3, value: 3, label: 'Subcategory' }],
          },
          { id: 1, value: 1, label: 'Category' },
          { id: 2, value: 2, label: 'Category', disabled: true },
        ];

        return <Tree selectable="radio" nodes={nodes} />;
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Custom Icons</H2>
    <Text>You can replace the folder icon with a custom icon of your choice.</Text>
    <Message
      type="warning"
      messages={[{ text: 'If you use the iconless prop, ALL icons with be hidden (including custom ones).' }]}
      marginBottom="medium"
    />
    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const nodes = [
          {
            id: 0,
            icon: <StoreIcon color="primary" />,
            label: 'Storefront - US',
            expanded: true,
            children: [{ id: 3, label: 'Subcategory' }],
          },
          { id: 1, icon: <LanguageIcon color="primary" />, label: 'Storefront - CA' },
          { id: 2, icon: <AssignmentIcon color="primary" />, label: 'Storefront - EU' },
        ];

        return <Tree nodes={nodes} />;
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Modifying Children</H2>
    <Text>
      By returning a object containing new children nodes, you have the freedom of modifying/replacing children nodes.
      This is useful when you need to asyncronously load in child nodes.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const nodes = [
          {
            id: 0,
            label: 'Category',
            children: [],
          },
          { id: 1, label: 'Category' },
          { id: 2, label: 'Category' },
        ];

        const handleOnExpand = ({ children }: TreeNodeProps<undefined>) => {
          if (children) {
            return { children: [{ id: 3, label: 'Category' }] };
          }

          return { children };
        };

        return <Tree nodes={nodes} onExpand={handleOnExpand} />;
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default TabsPage;
