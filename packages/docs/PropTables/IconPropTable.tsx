import React from 'react';

import { NextLink, PropTable } from '../components';

export const IconPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop
      name="color"
      types={
        <NextLink href="/Colors/ColorsPage" as="/colors">
          Color
        </NextLink>
      }
    >
      Sets the icon color given a color name from our{' '}
      <NextLink href="/Colors/ColorsPage" as="/colors">
        palette
      </NextLink>
      .
    </PropTable.Prop>
    <PropTable.Prop
      name="size"
      types={[
        <NextLink href="/Spacing/SpacingPage" as="/spacing">
          Spacing
        </NextLink>,
        'number',
      ]}
    >
      Determines the size of the icon. Accepts a{' '}
      <NextLink href="/Spacing/SpacingPage" as="/spacing">
        Spacing
      </NextLink>{' '}
      value or a number of px.
    </PropTable.Prop>
  </PropTable>
);
