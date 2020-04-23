import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const buttonProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your button's action is of normal or destructive nature.",
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
    name: 'iconOnly',
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
        component to replace content with an icon.
      </>
    ),
  },
  {
    name: 'iconRight',
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
        component to display to the right of the text.
      </>
    ),
  },
  {
    name: 'isLoading',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Used to determine if component is in a loading state.',
  },
  {
    name: 'variant',
    types: ['primary', 'secondary', 'subtle'],
    defaultValue: 'primary',
    description: 'Determines which style of button to display.',
  },
];

export const ButtonPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Button" propList={buttonProps} {...props} />
);
