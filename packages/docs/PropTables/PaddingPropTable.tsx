import { Link } from '@bigcommerce/big-design';
import React from 'react';

import { PropTable } from '../components';

export const PaddingPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="padding" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingTop" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the top padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingRight" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the right padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingBottom" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingLeft" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the left padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingVertical" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the top and bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop name="paddingHorizontal" types={<Link href="/big-design/utilities/padding">Padding</Link>}>
      Determines the left and right padding to be applied.
    </PropTable.Prop>
  </PropTable>
);
