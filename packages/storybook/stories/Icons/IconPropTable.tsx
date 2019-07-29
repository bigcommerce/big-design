import { Link } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

import { PropTable } from '../../components';

export const IconPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="color" types={<Link onClick={linkTo('Colors') as any}>Color</Link>}>
      Sets the icon color given a color name from our <Link onClick={linkTo('Colors') as any}>palette</Link>.
    </PropTable.Prop>
    <PropTable.Prop name="size" types={[<Link onClick={linkTo('utilities--spacing') as any}>Spacing</Link>, 'number']}>
      Determines the size of the icon. Accepts a <Link onClick={linkTo('utilities--spacing') as any}>Spacing</Link>{' '}
      value or a number of px.
    </PropTable.Prop>
  </PropTable>
);
