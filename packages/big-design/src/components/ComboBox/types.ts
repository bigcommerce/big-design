import { Placement } from '@popperjs/core';
import React, { ComponentPropsWithoutRef, RefObject } from 'react';

import { InputProps } from '../Input';

interface BaseComboBox extends Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'value'> {
  action?: ComboBoxAction;
  autoComplete?: string;
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
  optionsLoading?: boolean;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  onClose?(): void;
  onInputChange?(value: string): void;
  onOpen?(): void;
  onScrollToBottom?(): void;
}

export interface ComboBoxProps<T> extends BaseComboBox {
  options: Array<ComboBoxOption<T>> | Array<ComboBoxOptionGroup<T>>;
  value?: T;
  onOptionChange(value?: T, option?: ComboBoxOption<T>): void;
}

interface BaseItem extends Omit<ComponentPropsWithoutRef<'li'>, 'value'> {
  content: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  tooltip?: string;
}

export interface ComboBoxOption<T> extends BaseItem {
  value: T;
}

export interface ComboBoxAction extends BaseItem {
  actionType?: 'normal' | 'destructive';
  onActionClick(inputText: string | null): void;
}

export interface ComboBoxOptionGroup<T> {
  label: string;
  separated?: boolean;
  options: Array<ComboBoxOption<T>>;
}
