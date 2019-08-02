import React from 'react';

import { PropTable } from '../components';

export const BadgePropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="variant" defaults="secondary" types={['danger', 'secondary', 'success', 'warning']}>
      Determines which badge to display.
    </PropTable.Prop>
  </PropTable>
);
