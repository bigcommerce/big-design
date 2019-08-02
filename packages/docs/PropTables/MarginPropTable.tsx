import { Link } from '@bigcommerce/big-design';
import React from 'react';

import { PropTable } from '../components';

export const MarginPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="margin" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginTop" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the top margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginRight" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the right margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginBottom" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the bottom margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginLeft" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the left margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginVertical" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the top and bottom margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="marginHorizontal" types={<Link href="/utilities-margin">Margin</Link>}>
      Determines the left and right margin to be applied.
    </PropTable.Prop>
  </PropTable>
);
