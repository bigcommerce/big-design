import { Placement } from '@popperjs/core';
import React, { ComponentPropsWithoutRef, RefObject } from 'react';

import { InputProps } from '../Input';
import { SelectAction, SelectOption } from '../Select';
import { SelectOptionGroup } from '../Select/types';

interface BaseSelect extends Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'value'> {
  action?: SelectAction;
  autoComplete?: string;
  autoWidth?: boolean;
  description?: React.ReactNode;
  disabled?: boolean;
  error?: InputProps['error'];
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
  label?: React.ReactNode;
  labelId?: string;
  maxHeight?: number;
  name?: string;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export interface MultiSelectLocalization {
  selectAll: string;
}

export interface MultiSelectProps<T> extends BaseSelect {
  options: Array<SelectOption<T>> | Array<SelectOptionGroup<T>>;
  value?: T[];
  selectAll?: boolean;
  localization?: MultiSelectLocalization;
  onOptionsChange(value: T[], option: Array<SelectOption<T>>): void;
}
