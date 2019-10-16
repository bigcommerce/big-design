import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  maxHeight?: number;
  options: Array<DropdownItem | DropdownLinkItem>;
  placement?: Placement;
  trigger: React.ReactElement;
}

export interface DropdownItem extends BaseItem {
  type?: 'string';
}

export interface DropdownLinkItem extends BaseItem {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}

interface BaseItem extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
  value?: any;
  onClick?(item: DropdownItem | DropdownLinkItem): void;
}
