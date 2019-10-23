import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  maxHeight?: number;
  options: Array<Item | LinkItem>;
  placement?: Placement;
  trigger: React.ReactElement;
}

interface BaseItem extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
  value?: any;
  onClick?(item: Item | LinkItem): void;
}

export interface Item extends BaseItem {
  type?: 'string';
}

export interface LinkItem extends BaseItem {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}
