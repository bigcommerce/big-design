import React from 'react';

import { PropTable } from '../components';

export const ProgressBarPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="percent" types="number">
      Sets the fill length from 0 to 100.
    </PropTable.Prop>
  </PropTable>
);
