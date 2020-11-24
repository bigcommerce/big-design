import { Placement, State } from '@popperjs/core';
import { UseSelectPropGetters } from 'downshift';
import { HTMLAttributes } from 'react';

import { ListItemProps } from '../List/Item';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  autoWidth: boolean;
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

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
  getItemProps: UseSelectPropGetters<any>['getItemProps'];
  getMenuProps: UseSelectPropGetters<any>['getMenuProps'];
  highlightedIndex: number;
  isOpen: boolean;
  items: DropdownProps['items'];
  maxHeight: number;
  update: (() => Promise<Partial<State>>) | null;
}

export interface DropdownItemProps extends HTMLAttributes<HTMLLIElement> {
  getItemProps: UseSelectPropGetters<any>['getItemProps'];
  index: number;
  isHighlighted: boolean;
  item: DropdownItem | DropdownLinkItem;
}
