import { Placement } from '@popperjs/core';
import { LiHTMLAttributes } from 'react';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  autoWidth?: boolean;
  disabled?: boolean;
  items: Array<DropdownItem | DropdownLinkItem> | DropdownItemGroup[];
  maxHeight?: number;
  placement?: Placement;
  positionFixed?: boolean;
  toggle: React.ReactElement;
}

interface BaseItem extends Omit<LiHTMLAttributes<HTMLLIElement>, 'value'> {
  actionType?: 'normal' | 'destructive';
  content: string;
  description?: string;
  disabled?: boolean;
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
