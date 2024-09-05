import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const actionBarProps: Prop[] = [
  {
    name: 'actions',
    types: (
      <>
        <NextLink
          href={{ hash: 'action-button-prop-table', query: { props: 'action-button-props' } }}
        >
          ActionButton
        </NextLink>
        []
      </>
    ),
    description: 'An array of actions to display in the action bar. Supports up to three actions.',
    required: true,
  },
];

export const ActionBarPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={actionBarProps} title="ActionBar" {...props} />
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
  <PropTable propList={actionButtonProps} title="ActionBar[ActionButton]" {...props} />
);
