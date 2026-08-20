import { type ComponentPropsWithoutRef } from 'react';

import { type FormProps } from '../Form';
import { type InputProps } from '../Input';

export interface SearchLocalization {
  search: string;
}

export interface SearchProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onSubmit'> {
  localization?: SearchLocalization;
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit: FormProps['onSubmit'];
}
