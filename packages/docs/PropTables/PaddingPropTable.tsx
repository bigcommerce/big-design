import React from 'react';

import { NextLink, Prop, PropTable } from '../components';

const paddingProps: Prop[] = [
  {
    name: 'padding',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),
    description: 'Determines the padding to be applied.',
  },
  {
    name: 'paddingTop',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),
    description: 'Determines the top padding to be applied.',
  },
  {
    name: 'paddingRight',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),
    description: 'Determines the right padding to be applied.',
  },
  {
    name: 'paddingBottom',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),
    description: 'Determines the bottom padding to be applied.',
  },
  {
    name: 'paddingLeft',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),

    description: 'Determines the left padding to be applied.',
  },
  {
    name: 'paddingVertical',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),

    description: 'Determines the top and bottom padding to be applied.',
  },
  {
    name: 'paddingHorizontal',
    types: (
      <NextLink href="/Padding/PaddingPage" as="/padding">
        Padding
      </NextLink>
    ),

    description: 'Determines the left and right padding to be applied.',
  },
];

export const PaddingPropTable: React.FC = () => <PropTable propList={paddingProps} />;
