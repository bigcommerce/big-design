import { PillTabItem } from '@bigcommerce/big-design';

export interface Route extends PillTabItem {
  render(): React.JSX.Element;
}

export interface ContentRoutingTabsProps {
  routes: Route[];
  id: string;
}
