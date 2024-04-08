import { Placement } from '@popperjs/core';
import { ComponentPropsWithoutRef } from 'react';

export interface DropdownProps extends Omit<ComponentPropsWithoutRef<'ul'>, 'children'> {
  autoWidth?: boolean;
  disabled?: boolean;
  items: Array<DropdownItem | DropdownLinkItem> | DropdownItemGroup[];
  selectedItem?: DropdownItem;
  maxHeight?: number;
  placement?: Placement;
  positionFixed?: boolean;
  toggle: React.ReactElement<unknown>;
}

interface BaseItem extends Omit<ComponentPropsWithoutRef<'li'>, 'value'> {
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
