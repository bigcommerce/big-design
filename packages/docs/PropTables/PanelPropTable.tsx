import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const panelProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>Panel</Code> header text.
      </>
    ),
  },
  {
    name: 'headerId',
    types: 'string',
    description: (
      <>
        Gives the header a HTML <Code>id</Code> attribute. Useful if you need to use hash navigation
        to a <Code primary>Panel</Code> header.
      </>
    ),
  },
  {
    name: 'action',
    types: [
      <NextLink
        href={{ hash: 'panel-action-prop-table', query: { props: 'panel-action' } }}
        key="panel-action"
      >
        PanelAction
      </NextLink>,
      <NextLink
        href={{ hash: 'panel-dropdown-prop-table', query: { props: 'panel-dropdown' } }}
        key="panel-dropdown"
      >
        PanelDropdown
      </NextLink>,
    ],
    description: (
      <>
        Defines the <Code primary>Panel</Code> action button or dropdown.
      </>
    ),
  },
  {
    name: 'badge',
    types: [
      <NextLink href="/badge" key="badge-type">
        BadgeProps
      </NextLink>,
    ],
    description: (
      <>
        See <NextLink href="/badge">Badge</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'lozenge',
    types: [
      <NextLink href="/lozenge" key="lozenge-type">
        LozengeProps
      </NextLink>,
    ],
    description: (
      <>
        See <NextLink href="/lozenge">Lozenge</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'description',
    types: ['string', 'React.ReactNode'],
    description: 'Appends a description below the header and action.',
  },
];

export const PanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={panelProps} title="Panel" {...props} />
);

const PanelActionProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'The text content of the button.',
    required: true,
  },
];

export const PanelActionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={PanelActionProps} title="Panel[ActionButton]" {...props} />
);

const PanelDropdownProps: Prop[] = [
  {
    name: 'toggle',
    types: (
      <NextLink href={{ hash: 'panel-action-prop-table', query: { props: 'panel-action' } }}>
        PanelAction
      </NextLink>
    ),
    description: 'The button used to toggle the dropdown.',
    required: true,
  },
];

export const PanelDropdownPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={PanelDropdownProps} title="Panel[ActionDropdown]" {...props} />
);

const PanelContentsProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'The content of the panel.',
  },
  {
    name: 'padded',
    types: 'boolean',
    description: 'Determines if the panel contents have padding.',
    defaultValue: 'true',
  },
  {
    name: 'height',
    types: 'string',
    description: 'Sets the height of the panel contents. Value accepts any valid CSS height value.',
  },
  {
    name: 'scrollable',
    types: 'boolean',
    description:
      'Determines if the panel contents are scrollable. Height must be set for this to work.',
    defaultValue: 'false',
  },
];

export const PanelContentsPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={PanelContentsProps} title="Panel[Contents]" {...props} />
);
