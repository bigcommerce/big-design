import { SelectAction, SelectOption } from 'components/Select';
import { Placement } from 'popper.js';
import { RefObject } from 'react';

interface BaseSelect extends Omit<React.HTMLAttributes<HTMLInputElement>, 'children'> {
  action?: SelectAction;
  disabled?: boolean;
  error?: string;
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
