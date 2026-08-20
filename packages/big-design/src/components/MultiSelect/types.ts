import { type Placement } from '@popperjs/core';
import type { ComponentPropsWithoutRef, ReactNode, Ref, RefObject } from 'react';

import { type InputProps } from '../Input';
import { type SelectAction, type SelectOption } from '../Select';
import { type SelectOptionGroup } from '../Select/types';

interface BaseSelect extends Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'value'> {
  action?: SelectAction;
  autoComplete?: string;
  autoWidth?: boolean;
  description?: ReactNode;
  disabled?: boolean;
  error?: InputProps['error'];
  filterable?: boolean;
  inputRef?: RefObject<HTMLInputElement | null> | Ref<HTMLInputElement>;
  label?: ReactNode;
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
