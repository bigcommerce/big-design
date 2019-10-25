import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export interface DropdownProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  maxHeight?: number;
  options: Array<Item<T> | LinkItem<T>>;
  placement?: Placement;
  trigger: React.ReactElement;
}

interface BaseItem<T> extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
  value?: T;
  onClick?(item: Item<T> | LinkItem<T>): void;
}

export interface Item<T> extends BaseItem<T> {
  type?: 'string';
}

export interface LinkItem<T> extends BaseItem<T> {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}
