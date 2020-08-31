import { Placement } from '@popperjs/core';

import { ListItemProps } from '../List/Item';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  disabled?: boolean;
  items: Array<DropdownItem | DropdownLinkItem> | DropdownItemGroup[];
  maxHeight?: number;
  placement?: Placement;
  toggle: React.ReactElement;
}

interface BaseItem extends Omit<ListItemProps, 'children' | 'content' | 'isAction' | 'isHighlighted' | 'isSelected'> {
  content: string;
  icon?: React.ReactElement;
  tooltip?: string;
}

export interface DropdownItem extends BaseItem {
  hash?: string;
  type?: 'text';
  onItemClick(item: DropdownItem): void;
}

export interface DropdownLinkItem extends BaseItem {
  target?: HTMLAnchorElement['target'];
  type: 'link';
  url: string;
}

export interface DropdownItemGroup {
  label?: string;
  separated?: boolean;
  items: Array<DropdownItem | DropdownLinkItem>;
}
