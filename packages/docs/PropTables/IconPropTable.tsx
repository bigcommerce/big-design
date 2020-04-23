import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const iconProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    description: 'SVG Title, for accessibility purposes.',
  },
  {
    name: 'color',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    description: (
      <>
        Sets the icon color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'size',
    types: [
      <NextLink href="/Spacing/SpacingPage" as="/spacing" key="1">
        Spacing
      </NextLink>,
      'number',
    ],
    description: (
      <>
        Determines the size of the icon. Accepts a{' '}
        <NextLink href="/Spacing/SpacingPage" as="/spacing">
          Spacing
        </NextLink>{' '}
        value or a number of px.
      </>
    ),
  },
];

export const IconPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Icon" propList={iconProps} {...props} />
);
