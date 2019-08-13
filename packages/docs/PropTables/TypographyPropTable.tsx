import React from 'react';

import { NextLink, PropTable } from '../components';

export const TypographyPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop
      name="color"
      types={
        <NextLink href="/Colors/ColorsPage" as="/colors">
          Color
        </NextLink>
      }
      defaults="secondary70"
    >
      Sets the text color given a color name from our{' '}
      <NextLink href="/Colors/ColorsPage" as="/colors">
        palette
      </NextLink>
      .
    </PropTable.Prop>
    <PropTable.Prop name="ellipse" types="boolean">
      Controls whether the text will concat and display ellipse... on overflow.
    </PropTable.Prop>
  </PropTable>
);
