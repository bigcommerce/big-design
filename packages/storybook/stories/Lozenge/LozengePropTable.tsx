import React from 'react';

import { PropTable } from '../../components';

export const LozengePropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="variant" types={['danger', 'primary', 'secondary', 'success', 'warning']}>
      Determines which lozenge to display.
    </PropTable.Prop>
  </PropTable>
);
