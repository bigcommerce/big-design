import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export type DropdownOption<T> = DropdownItem<T> | DropdownLinkItem<T>;

export interface DropdownProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  maxHeight?: number;
  options: Array<DropdownOption<T>> | Array<DropdownOptionGroup<T>>;
  placement?: Placement;
  trigger: React.ReactElement;
}

interface BaseItem<T> extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
  tooltip?: string;
  value?: T;
  onClick?(item: DropdownOption<T>): void;
}

export interface DropdownItem<T> extends BaseItem<T> {
  type?: 'string';
}

export interface DropdownLinkItem<T> extends BaseItem<T> {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}

export interface DropdownOptionGroup<T> {
  label: string;
  options: Array<DropdownOption<T>>;
}
