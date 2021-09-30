import { PillTabItem } from '@bigcommerce/big-design';

export interface Route extends PillTabItem {
  render(): JSX.Element;
}

export interface ContentRoutingTabsProps {
  routes: Route[];
  id: string;
}
