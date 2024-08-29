import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const headerProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'The main title of the header.',
    required: true,
  },
  {
    name: 'actions',
    types: 'Array<ActionButtonProps | ActionDropdownProps>',
    description: 'An array of actions to display in the header. Can include buttons or dropdowns.',
  },
  {
    name: 'backLink',
    types: 'BackLinkProps',
    description: 'Configuration for a back link displayed at the top left of the header.',
  },
  {
    name: 'badge',
    types: 'BadgeProps',
    description: 'Props to display a badge next to the title.',
  },
  {
    name: 'description',
    types: 'string | ReactNode',
    description: 'A description to display under the title.',
  },
  {
    name: 'icon',
    types: 'ReactNode',
    description: 'An icon to display to the left of the title.',
  },
  {
    name: 'children',
    types: 'ReactNode',
    description: 'Any additional content to render inside the header.',
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
  {
    name: 'variant',
    types: `'primary' | 'secondary' | 'danger'`,
    description: 'The style variant of the button.',
    required: true,
  },
];

export const ActionButtonPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={actionButtonProps} title="Header[ActionButton]" {...props} />
);

const actionDropdownProps: Prop[] = [
  {
    name: 'toggle',
    types: 'ActionButtonProps',
    description: 'The button used to toggle the dropdown.',
    required: true,
  },
  {
    name: 'items',
    types: 'Array<{ content: ReactNode, onClick: () => void }>',
    description: 'The dropdown menu items.',
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
  <PropTable propList={backLinkProps} title="Header[BackLink]" nativeElement={['a', 'all']} {...props} />
);