import { Link } from '@bigcommerce/big-design';
import React from 'react';

import { PropTable } from '../components';

export const IconPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="color" types={<Link href="/colors">Color</Link>}>
      Sets the icon color given a color name from our <Link href="/colors">palette</Link>.
    </PropTable.Prop>
    <PropTable.Prop name="size" types={[<Link href="/spacing">Spacing</Link>, 'number']}>
      Determines the size of the icon. Accepts a <Link href="/spacing">Spacing</Link> value or a number of px.
    </PropTable.Prop>
  </PropTable>
);
