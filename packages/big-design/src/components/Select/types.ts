import { Placement } from '@popperjs/core';
import React, { ComponentPropsWithoutRef, RefObject } from 'react';

import { InputProps } from '../Input';
import { InputLocalization } from '../Input/Input';

interface BaseSelect extends Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'value'> {
  action?: SelectAction;
  autoComplete?: string;
  autoWidth?: boolean;
  description?: React.ReactChild;
  disabled?: boolean;
  error?: InputProps['error'];
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
  label?: React.ReactChild;
  labelId?: string;
  localization?: InputLocalization;
  maxHeight?: number;
  name?: string;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export interface SelectProps<T> extends BaseSelect {
  options: Array<SelectOption<T>> | Array<SelectOptionGroup<T>>;
  value?: T;
  onOptionChange(value?: T, option?: SelectOption<T>): void;
}

interface BaseItem extends Omit<ComponentPropsWithoutRef<'li'>, 'value'> {
  content: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  tooltip?: string;
}

export interface SelectOption<T> extends BaseItem {
  value: T;
}

export interface SelectAction extends BaseItem {
  actionType?: 'normal' | 'destructive';
  onActionClick(inputText: string | null): void;
}

export interface SelectOptionGroup<T> {
  label: string;
  separated?: boolean;
  options: Array<SelectOption<T>>;
}
