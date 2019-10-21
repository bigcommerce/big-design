import { Placement } from 'popper.js';

import { ListItemProps } from '../List/Item';

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children' | 'onChange'> {
  action?: Action;
  disabled?: boolean;
  error?: string;
  label?: string;
  maxHeight?: number;
  multi?: boolean;
  options: Option[];
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  value?: any;
  onChange(option: Option | Option[]): void;
}

interface BaseItem extends Omit<ListItemProps, 'children' | 'content' | 'onClick' | 'value'> {
  content: string;
  icon?: React.ReactElement;
}

export interface Option extends Omit<BaseItem, 'actionType'> {
  value: any;
}

export interface Action extends BaseItem {
  onClick(inputText: string): void;
}
