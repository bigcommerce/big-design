import { FormProps } from '../Form';
import { InputProps } from '../Input';

export interface SearchProps {
  value: InputProps['value'];
  onChange: InputProps['onChange'];
  onSubmit: FormProps['onSubmit'];
}
