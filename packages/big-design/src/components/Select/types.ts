import { Placement } from 'popper.js';
import React from 'react';

import { ListItemProps } from '../List/Item';

export interface SelectProps<T> extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children' | 'onChange' | 'ref'> {
  action?: Action;
  disabled?: boolean;
  error?: string;
  filterable?: boolean;
  label?: string;
  maxHeight?: number;
  multi?: boolean;
  name?: string;
  options: Array<Option<T>>;
  placement?: Placement;
  positionFixed?: boolean;
  inputRef?: React.RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
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
