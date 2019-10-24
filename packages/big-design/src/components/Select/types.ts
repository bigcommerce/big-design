import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export interface SelectProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children' | 'onChange'> {
  action?: Action;
  disabled?: boolean;
  error?: string;
  label?: string;
  maxHeight?: number;
  multi?: boolean;
  options: Array<Option<T>>;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  value?: T | T[];
  onChange(value: T | T[], option: Option<T> | Array<Option<T>>): void;
}

interface BaseItem extends Omit<ListItemProps, 'children' | 'content' | 'value'> {
  content: string;
  icon?: React.ReactElement;
}

export interface Option<T> extends Omit<BaseItem, 'actionType'> {
  value: T;
}

export interface Action extends Omit<BaseItem, 'onClick'> {
  onClick(inputText: string): void;
}
