import { H1, Message, Panel, StatefulTree, Text } from '@bigcommerce/big-design';
import { AssignmentIcon, LanguageIcon, StoreIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { StatefulTreePropTable, TreeNodePropTable } from '../PropTables';

const StatefulTreePage = () => {
  return (
    <>
      <H1>StatefulTree</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>StatefulTree</Code> component is used to display a tree of items. Useful for defining a tree
          of categories or subcollections.
        </Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>To display a tree of items</List.Item>
          <List.Item>Creating or assigning items to a specific category/sub-category</List.Item>
          <List.Item>To organize items through structure hierarchy</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'multiple-selections',
              title: 'Multiple selections',
              render: () => (
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
              ),
            },
            {
              id: 'single-select',
              title: 'Single selection',
              render: () => (
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
                      <StatefulTree
                        selectable="radio"
                        nodes={nodes}
                        defaultExpanded={['0']}
                        disabledNodes={['0', '2']}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'custom-icons',
              title: 'Custom icons',
              render: () => (
                <>
                  <Text>You can replace the folder icon with a custom icon of your choice.</Text>
                  <Message
                    type="warning"
                    messages={[
                      { text: 'If you use the iconless prop, ALL icons will be hidden (including custom ones).' },
                    ]}
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
                </>
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
              id: 'stateful-tree',
              title: 'StatefulTree',
              render: () => <StatefulTreePropTable renderPanel={false} />,
            },
            {
              id: 'tree-node',
              title: 'TreeNode',
              render: () => <TreeNodePropTable id="tree-node-prop-table" renderPanel={false} />,
            },
          ]}
        />
      </Panel>
    </>
  );
};

export default StatefulTreePage;
