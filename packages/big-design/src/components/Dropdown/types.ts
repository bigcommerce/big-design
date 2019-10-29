import { Placement } from 'popper.js';
import { PopperProps } from 'react-popper';

import { ListItemProps } from '../List/Item';

export interface DropdownProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  maxHeight?: number;
  options: Array<DropdownItem<T> | DropdownLinkItem<T>>;
  placement?: Placement;
  trigger: React.ReactElement;
}

interface BaseItem<T> extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
  tooltip?: {
    message: string;
    placement?: PopperProps['placement'];
  };
  value?: T;
  onClick?(item: DropdownItem<T> | DropdownLinkItem<T>): void;
}

export interface DropdownItem<T> extends BaseItem<T> {
  type?: 'string';
}

export interface DropdownLinkItem<T> extends BaseItem<T> {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}
