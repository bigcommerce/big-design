import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const marginProps: Prop[] = [
  {
    name: 'margin',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the margin to be applied.',
  },
  {
    name: 'marginTop',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the top margin to be applied.',
  },
  {
    name: 'marginRight',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the right margin to be applied.',
  },
  {
    name: 'marginBottom',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the bottom margin to be applied.',
  },
  {
    name: 'marginLeft',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the left margin to be applied.',
  },
  {
    name: 'marginVertical',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the top and bottom margin to be applied.',
  },
  {
    name: 'marginHorizontal',
    types: (
      <NextLink href="/Margin/MarginPage" as="/margin">
        Margin
      </NextLink>
    ),
    description: 'Determines the left and right margin to be applied.',
  },
];

export const MarginPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Margin" propList={marginProps} {...props} />
);
