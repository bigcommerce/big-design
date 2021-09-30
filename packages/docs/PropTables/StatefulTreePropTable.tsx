import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const statefulTreeProps: Prop[] = [
  {
    name: 'defaultExpanded',
    types: 'string[]',
    description: 'An array of expanded node ids. Can also be used to reset expanded nodes.',
  },
  {
    name: 'defaultSelected',
    types: 'string[]',
    description: 'An array of selected node ids. Can also be used to reset selected nodes.',
  },
  {
    name: 'disabledNodes',
    types: 'string[]',
    description:
      'An array of disabled node ids. Nodes will not be abled to be selectedable but can still expand/collapse.',
  },
  {
    name: 'iconless',
    types: 'boolean',
    description: 'Hides/shows all icons on the tree.',
  },
  {
    name: 'id',
    types: 'string',
    description: 'Defines a HTML id attribute to the parent wrapper.',
  },
  {
    name: 'nodes',
    types: <NextLink href="#tree-node-prop-table">TreeNode[]</NextLink>,
    description: (
      <>
        Nodes to render in the tree. See <NextLink href="#tree-node-prop-table">below</NextLink> for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'onExpandedChange',
    types: '(expandedNodes: string[]) => void',
    description:
      'Function that will get called when a tree node is expanded/collapsed. Passes the ids of expanded nodes as an argument.',
  },
  {
    name: 'onNodeClick',
    types: '(event: React.MouseEvent<HTMLLIElement>, nodeId: string) => void',
    description: 'Function that will get called when a tree node is clicked.',
  },
  {
    name: 'onSelectionChange',
    types: '(selectedValues: T[]) => void',
    description:
      'Function that will get called when a tree node is selected/deselecteds. Passes the values of selected nodes as an argument.',
  },
  {
    name: 'selectable',
    types: ['multi', 'radio'],
    description: 'Determines the type of selectable tree to render.',
  },
];

export const StatefulTreePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="StatefulTree" propList={statefulTreeProps} {...props} />
);

const treeNodeProps: Prop[] = [
  {
    name: 'children',
    types: 'TreeNode[]',
    description: 'Children for the current node.',
  },
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: 'Custom icon, in place of the folder icon.',
  },
  {
    name: 'id',
    types: 'string',
    description: 'TreeNode identifier, must be unique.',
    required: true,
  },
  {
    name: 'label',
    types: 'string',
    description: 'Label for the tree node.',
    required: true,
  },
  {
    name: 'value',
    types: 'T',
    description: (
      <>
        Value of the selected node. A checkbox or radio will not appear if <Code primary>value</Code> and{' '}
        <Code primary>selectable</Code> is not defined.
      </>
    ),
  },
];

export const TreeNodePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="StatefulTree[TreeNode]" propList={treeNodeProps} {...props} />
);
