import { PillTabItem } from '@bigcommerce/big-design';
import React from 'react';

export interface Route extends PillTabItem {
  render(): React.JSX.Element;
}

export interface ContentRoutingTabsProps {
  routes: Route[];
  id: string;
}
