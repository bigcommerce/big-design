import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const collapseProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: (
      <>
        Should include a <code>Collapse.Trigger</code> and a <code>Collapse.Panel</code>. Placement
        within the subtree is up to the consumer.
      </>
    ),
    required: true,
  },
  {
    name: 'initiallyOpen',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Initial open state when uncontrolled.',
  },
  {
    name: 'isOpen',
    types: 'boolean',
    description:
      'Controlled open state. When provided, the component is controlled and ignores initiallyOpen.',
  },
  {
    name: 'onCollapseChange',
    types: '(isOpen: boolean) => void',
    description:
      'Fires when the trigger toggles, and when an open panel is auto-closed because disabled became true.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description:
      "Disables the trigger so it can't be toggled. If the panel is open when disabled becomes true, it auto-collapses and fires onCollapseChange(false).",
  },
];

const collapseTriggerProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'Trigger label rendered alongside the chevron icon.',
    required: true,
  },
];

const collapsePanelProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Collapsible content rendered when the panel is open.',
  },
  {
    name: 'backgroundColor',
    types: 'keyof Colors',
    defaultValue: 'unset',
    description: 'Panel background color.',
  },
];

export const CollapsePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={collapseProps} title="Collapse" {...props} />
);

export const CollapseTriggerPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={collapseTriggerProps} title="Collapse.Trigger" {...props} />
);

export const CollapsePanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={collapsePanelProps} title="Collapse.Panel" {...props} />
);
