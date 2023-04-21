import { InputHTMLAttributes } from 'react';

import { FormProps } from '../Form';
import { InputProps } from '../Input';

interface Localization {
  search: string;
}

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  localization?: Localization;
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit: FormProps['onSubmit'];
}
