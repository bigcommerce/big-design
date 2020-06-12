import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const treeProps: Prop[] = [
  {
    name: 'iconless',
    types: 'boolean',
    description: 'Hides/shows all icons on the tree.',
  },
  {
    name: 'initialNodes',
    types: <NextLink href="#tree-node-prop-table">TreeNode[]</NextLink>,
    description: (
      <>
        Initial set of nodes to render. See <NextLink href="#tree-node-prop-table">below</NextLink> for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'onCollapse',
    types: '(node: TreeNode) => TreeNodeRef | void',
    description:
      'Function that will get called when a tree node is collapsed. You can modify the children by returning an object with children as a key/value pair.',
  },
  {
    name: 'onExpand',
    types: '(node: TreeNode) => TreeNodeRef | void',
    description:
      'Function that will get called when a tree node is expanded. You can modify the children by returning an object with children as a key/value pair.',
  },
  {
    name: 'onSelect',
    types: '(value: T[] | T) => void',
    description: (
      <>
        Function that will get called when a tree node is collapsed. Based on the <Code primary>selectable</Code> prop,
        it'll return either an array of values, or a single value.
      </>
    ),
  },
  {
    name: 'selectable',
    types: ['multi', 'radio'],
    description: 'Function that will get called when a tree node is expanded.',
  },
];

export const TreePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Tree" propList={treeProps} {...props} />
);

const treeNodeProps: Prop[] = [
  {
    name: 'nodes',
    types: 'TreeNode[]',
    description: 'Children for the current node.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Determines if the TreeNode is disabled.',
  },
  {
    name: 'expanded',
    types: 'boolean',
    description: 'Determines if the TreeNode is expanded by default.',
  },
  {
    name: 'icon',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: 'Custom icon, in place of the folder icon.',
  },
  {
    name: 'id',
    types: ['string', 'number'],
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
    name: 'selected',
    types: 'string',
    description: 'Determines if the TreeNode is selected by default.',
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
  <PropTable title="Tree[TreeNode]" propList={treeNodeProps} {...props} />
);
