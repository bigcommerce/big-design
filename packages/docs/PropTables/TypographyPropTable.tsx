import React from 'react';

import { NextLink, Prop, PropTable } from '../components';

const typographyProps: Prop[] = [
  {
    name: 'color',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    defaultValue: 'secondary70',
    description: (
      <>
        Sets the text color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'ellipse',
    types: 'boolean',
    description: 'Controls whether the text will concat and display ellipse... on overflow.',
  },
];

export const TypographyPropTable: React.FC = () => <PropTable propList={typographyProps} />;
