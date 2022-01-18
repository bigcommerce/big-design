import { InputHTMLAttributes } from 'react';

import { FormProps } from '../Form';
import { InputProps } from '../Input';

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit: FormProps['onSubmit'];
}
