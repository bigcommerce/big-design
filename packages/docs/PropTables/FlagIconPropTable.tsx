import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const flagIconProps: Prop[] = [
  {
    name: 'title',
    defaultValue: 'Name of flag',
    types: 'string',
    description: 'SVG Title, for accessibility purposes.',
  },
  {
    name: 'size',
    types: [
      <NextLink href="/spacing" key="1">
        Spacing
      </NextLink>,
      'number',
    ],
    description: (
      <>
        Determines the size of the icon. Accepts a <NextLink href="/spacing">Spacing</NextLink>{' '}
        value or a number of px.
      </>
    ),
  },
];

export const FlagIconPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={flagIconProps} title="FlagIcon" {...props} />
);
