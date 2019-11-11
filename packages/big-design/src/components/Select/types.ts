import { Placement } from 'popper.js';
import { RefObject } from 'react';

import { ListItemProps } from '../List/Item';

export interface SelectProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children' | 'onChange'> {
  action?: Action;
  disabled?: boolean;
  error?: string;
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
  label?: string;
  maxHeight?: number;
  multi?: boolean;
  name?: string;
  options: Array<Option<T>>;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  value?: T | T[];
  onItemChange(value: T | T[], option: Option<T> | Array<Option<T>>): void;
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
