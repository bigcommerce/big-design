import React from 'react';

import { PropTable } from '../components';

export const TabsPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="activeTab" types="string">
      Determines the active tab by id.
    </PropTable.Prop>
    <PropTable.Prop name="onTabClick" types="(tabId: string) => void">
      Function that will get called when a tab is clicked.
    </PropTable.Prop>
  </PropTable>
);

export const TabPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="id" types="string">
      Tab identifier, must be unique.
    </PropTable.Prop>
    <PropTable.Prop name="disabled" types="boolean">
      Determines if the Tab is disabled.
    </PropTable.Prop>
  </PropTable>
);
