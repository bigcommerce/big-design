import type { Placement } from '@popperjs/core';
import React, { RefObject } from 'react';

import { InputProps } from '../Input';
import { ListItemProps } from '../List/Item';

interface BaseSelect extends Omit<React.HTMLAttributes<HTMLInputElement>, 'children'> {
  action?: SelectAction;
  description?: React.ReactChild;
  disabled?: boolean;
  error?: InputProps['error'];
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
  label?: string;
  labelId?: string;
  maxHeight?: number;
  name?: string;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
}

export interface SelectProps<T> extends BaseSelect {
  options: Array<SelectOption<T> | SelectOptionGroup<T>>;
  value?: T;
  onOptionChange(value?: T, option?: SelectOption<T>): void;
}

interface BaseItem
  extends Omit<ListItemProps, 'children' | 'content' | 'isAction' | 'isHighlighted' | 'isSelected' | 'value'> {
  content: string;
  icon?: React.ReactElement;
}

export interface SelectOption<T> extends Omit<BaseItem, 'actionType'> {
  value: T;
}

export interface SelectAction extends BaseItem {
  onActionClick(inputText: string | null): void;
}

export interface SelectOptionGroup<T> {
  label: string;
  options: Array<SelectOption<T>>;
}
