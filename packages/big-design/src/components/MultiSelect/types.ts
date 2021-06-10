import { Placement } from '@popperjs/core';
import React, { RefObject } from 'react';

import { InputProps } from '../Input';
import { SelectAction, SelectOption } from '../Select';
import { SelectOptionGroup } from '../Select/types';

interface BaseSelect extends Omit<React.HTMLAttributes<HTMLInputElement>, 'children'> {
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
  maxHeight?: number;
  name?: string;
  placement?: Placement;
  positionFixed?: boolean;
  required?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export interface MultiSelectProps<T> extends BaseSelect {
  options: Array<SelectOption<T>> | Array<SelectOptionGroup<T>>;
  value?: T[];
  onOptionsChange(value: T[], option: Array<SelectOption<T>>): void;
}
