import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const collapseProps: Prop[] = [
  {
    name: 'title',
    types: ['string', 'React.ReactNode'],
    description: 'Collapse title.',
    required: true,
  },
  {
    name: 'initiallyOpen',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Defines if panel with content is visible by default.',
  },
  {
    name: 'onCollapseChange',
    types: '(isOpen: boolean) => void',
    description: 'Function that will be called when a title is clicked.',
  },
  {
    name: 'portalTarget',
    types: ['Element', 'null'],
    defaultValue: 'null',
    description:
      'The panel is mounted at that node instead of inline next to the trigger. When omitted, the panel renders in place.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: "Disables the title button so it can't be toggled.",
  },
  {
    name: 'panelProps',
    types: (
      <NextLink
        href={{
          hash: 'collapse-panel-prop-table',
          query: { props: 'collapse-panel' },
        }}
      >
        CollapsePanelProps
      </NextLink>
    ),
    description:
      'Accepts padding, margin, and backgroundColor for styling the collapsible region without wrapping it externally.',
  },
];

const collapsePanelProps: Prop[] = [
  {
    name: 'backgroundColor',
    types: (
      <NextLink href="/colors" key="colors-type">
        Colors
      </NextLink>
    ),
    defaultValue: 'unset',
    description: 'Panel background color.',
    required: false,
  },
];

export const CollapsePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={collapseProps} title="Collapse" {...props} />
);

export const CollapsePanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    id="collapse-panel-prop-table"
    propList={collapsePanelProps}
    title="Collapse[CollapsePannel]"
    {...props}
  />
);
