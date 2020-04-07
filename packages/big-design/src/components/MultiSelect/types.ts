import { Placement } from '@popperjs/core';
import { RefObject } from 'react';

import { InputProps } from '../Input';
import { SelectAction, SelectOption } from '../Select';

interface BaseSelect extends Omit<React.HTMLAttributes<HTMLInputElement>, 'children'> {
  action?: SelectAction;
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

export interface MultiSelectProps<T> extends BaseSelect {
  options: Array<SelectOption<T>>;
  value?: T[];
  onOptionsChange(value: T[], option: Array<SelectOption<T>>): void;
}
