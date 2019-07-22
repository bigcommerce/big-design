import { Link } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

import { PropTable } from '../../../components';

export const PaddingPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="padding" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingTop" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the top padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingRight" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the right padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingBottom" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingLeft" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the left padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingVertical" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the top and bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingHorizontal" types={<Link onClick={linkTo('utilities--padding') as any}>Padding</Link>}>
      Determines the left and right padding to be applied.
    </PropTable.Prop>
  </PropTable>
);
