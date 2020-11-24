import { Placement, State } from '@popperjs/core';
import { UseSelectPropGetters } from 'downshift';
import React, { HTMLAttributes, RefObject } from 'react';

import { InputProps } from '../Input';
import { ListItemProps } from '../List/Item';

interface BaseSelect extends Omit<React.HTMLAttributes<HTMLInputElement>, 'children'> {
  action?: SelectAction;
  autoWidth?: boolean;
  description?: React.ReactChild;
  disabled?: boolean;
  error?: InputProps['error'];
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
  label?: React.ReactChild;
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
  description?: string;
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

export interface SelectMenuProps<T> extends HTMLAttributes<HTMLUListElement> {
  action?: SelectAction;
  autoWidth: boolean;
  getItemProps: UseSelectPropGetters<T>['getItemProps'];
  getMenuProps: UseSelectPropGetters<T>['getMenuProps'];
  highlightedIndex: number;
  isOpen: boolean;
  options: SelectProps<T>['options'];
  maxHeight: number;
  selectedItem: any;
  selectOptions: (SelectAction | SelectOption<T>)[];
  update: (() => Promise<Partial<State>>) | null;
}

export interface SelectItemProps<T> extends HTMLAttributes<HTMLLIElement> {
  autoWidth: boolean;
  getItemProps: UseSelectPropGetters<T>['getItemProps'];
  index: number;
  isAction?: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  selectedItem: SelectOption<T> | SelectAction | null;
  item: SelectOption<T> | SelectAction;
}
