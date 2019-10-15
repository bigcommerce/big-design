import React from 'react';

import { PropTable } from '../components';

export const PanelPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="header" types="string">
      Defines the panel header text.
    </PropTable.Prop>
    <PropTable.Prop name="action" types="ButtonProps &amp; { text: string }">
      Defines the panel action button.
    </PropTable.Prop>
  </PropTable>
);
