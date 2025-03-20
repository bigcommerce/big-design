import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const headerProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'The main title of the header.',
    required: true,
  },
  {
    name: 'actions',
    types: (
      <>
        {'Array<'}
        <NextLink href={{ hash: 'action-button-prop-table', query: { props: 'action-button' } }}>
          ActionButton
        </NextLink>
        {' | '}
        <NextLink
          href={{ hash: 'action-dropdown-prop-table', query: { props: 'action-dropdown' } }}
        >
          ActionDropdown
        </NextLink>
        {'>'}
      </>
    ),
    description: 'An array of actions to display in the header. Can include buttons or dropdowns.',
  },
  {
    name: 'backLink',
    types: (
      <NextLink href={{ hash: 'backlink-prop-table', query: { props: 'back-link' } }}>
        BackLink
      </NextLink>
    ),
    description: 'Configuration for a back link displayed at the top left of the header.',
  },
  {
    name: 'badge',
    types: (
      <NextLink href="/badge#props" key="badge-type">
        BadgeProps
      </NextLink>
    ),
    description: 'Props to display a badge next to the title.',
  },
  {
    name: 'description',
    types: [
      'string',
      <NextLink
        href={{ pathname: '/typography', query: { implementation: 'text', props: 'text' } }}
        key="text-type"
      >
        Text
      </NextLink>,
    ],
    description: 'A description to display under the title.',
  },
  {
    name: 'icon',
    types: 'ReactNode',
    description: (
      <>
        Prop reserved for an <NextLink href="/icons">Icon</NextLink> to display to the left of the
        title.
      </>
    ),
  },
  {
    name: 'lozenge',
    types: 'ReactNode',
    description: (
      <>
        Prop reserved for a <NextLink href="/lozenge">Lozenge</NextLink> to display the lifecycle
        version of the feature.
      </>
    ),
  },
];

export const HeaderPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={headerProps} title="Header" {...props} />
);

const actionButtonProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'The text content of the button.',
    required: true,
  },
];

export const ActionButtonPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={actionButtonProps} title="Header[ActionButton]" {...props} />
);

const actionDropdownProps: Prop[] = [
  {
    name: 'toggle',
    types: (
      <NextLink href={{ hash: 'action-button-prop-table', query: { props: 'action-button' } }}>
        ActionButton
      </NextLink>
    ),
    description: 'The button used to toggle the dropdown.',
    required: true,
  },
];

export const ActionDropdownPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={actionDropdownProps} title="Header[ActionDropdown]" {...props} />
);

const backLinkProps: Prop[] = [
  {
    name: 'text',
    types: 'string',
    description: 'The text content of the back link.',
    required: true,
  },
];

export const BackLinkPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    nativeElement={['a', 'all']}
    propList={backLinkProps}
    title="Header[BackLink]"
    {...props}
  />
);
