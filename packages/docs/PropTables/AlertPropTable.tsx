import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const alertProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: 'Defines the alert header text.',
  },
  {
    name: 'iconLeft',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'variant',
    types: ['primary', 'danger', 'success', 'warning'],
    defaultValue: 'primary',
    description: 'Determines which style of alert to display.',
  },
  {
    name: 'onCloseButtonClick',
    types: '() => void',
    description: 'Function that will be called on close button click events.',
  },
];

export const AlertPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Alert" propList={alertProps} {...props} />
);
