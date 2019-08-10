import { Link } from '@bigcommerce/big-design';
import React from 'react';

import { PropTable } from '../components';

export const TypographyPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="color" types={<Link href="/big-design/colors">Color</Link>} defaults="secondary70">
      Sets the text color given a color name from our <Link href="/big-design/colors">palette</Link>.
    </PropTable.Prop>
    <PropTable.Prop name="ellipse" types="boolean">
      Controls whether the text will concat and display ellipse... on overflow.
    </PropTable.Prop>
  </PropTable>
);
