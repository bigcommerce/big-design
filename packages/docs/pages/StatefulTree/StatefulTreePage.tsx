import { H1, Message, Panel, StatefulTree, Text } from '@bigcommerce/big-design';
import { AssignmentIcon, LanguageIcon, StoreIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { StatefulTreePropTable, TreeNodePropTable } from '../../PropTables';

const StatefulTreePage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel header="Multiple selections">
            <Text>
              The <Code primary>StatefulTree</Code> component is used to display a tree of items. Useful for defining a
              tree of categories or subcollections.
            </Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const nodes = [
                  {
                    id: '0',
                    value: 0,
                    label: 'Category',
                    children: [
                      {
                        id: '5',
                        value: 5,
                        label: 'Category',
                        children: [{ id: '9', value: 9, label: 'Category' }],
                      },
                    ],
                  },
                  {
                    id: '1',
                    value: 1,
                    label: 'Category',
                    children: [{ id: '6', value: 6, label: 'Category' }],
                  },
                  { id: '2', value: 2, label: 'Category' },
                  {
                    id: '3',
                    value: 3,
                    label: 'Category',
                    children: [{ id: '7', value: 7, label: 'Category' }],
                  },
                  { id: '4', value: 4, label: 'Category', children: [{ id: '8', value: 8, label: 'Category' }] },
                ];

                return (
                  <StatefulTree
                    defaultExpanded={['0', '5', '1']}
                    defaultSelected={['9', '3', '7']}
                    disabledNodes={['1']}
                    nodes={nodes}
                    selectable="multi"
                  />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Single selection">
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const nodes = [
                  {
                    id: '0',
                    value: 0,
                    label: 'Category',
                    children: [{ id: '3', value: 3, label: 'Subcategory' }],
                  },
                  { id: '1', value: 1, label: 'Category' },
                  { id: '2', value: 2, label: 'Category' },
                ];

                return (
                  <StatefulTree selectable="radio" nodes={nodes} defaultExpanded={['0']} disabledNodes={['0', '2']} />
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Custom icons">
            <Text>You can replace the folder icon with a custom icon of your choice.</Text>
            <Message
              type="warning"
              messages={[{ text: 'If you use the iconless prop, ALL icons will be hidden (including custom ones).' }]}
              marginBottom="medium"
            />
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const nodes = [
                  {
                    id: '0',
                    icon: <StoreIcon color="primary" />,
                    label: 'Storefront - US',
                    children: [{ id: '3', label: 'Subcategory' }],
                  },
                  { id: '1', icon: <LanguageIcon color="primary" />, label: 'Storefront - CA' },
                  { id: '2', icon: <AssignmentIcon color="primary" />, label: 'Storefront - EU' },
                ];

                return <StatefulTree defaultExpanded={['0']} nodes={nodes} />;
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
          <StatefulTreePropTable />
          <TreeNodePropTable id="tree-node-prop-table" />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>StatefulTree</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default StatefulTreePage;
