import React from 'react';

import { PropTable } from '../components';

export const ProgressCirclePropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="error" types="boolean">
      Sets state to error.
    </PropTable.Prop>
    <PropTable.Prop name="percent" types="number">
      Sets the fill length from 0 to 100.
    </PropTable.Prop>
    <PropTable.Prop name="size" types={['xSmall', 'small', 'medium', 'large']} defaults="medium">
      Size of the component.
    </PropTable.Prop>
  </PropTable>
);
