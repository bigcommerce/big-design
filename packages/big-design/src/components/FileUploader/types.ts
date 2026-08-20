import type { MarginProps } from '../../helpers';
import type { ButtonProps } from '../Button';

export interface Localization {
  upload: string;
  showLess: string;
  showMore: string;
  canNotUploadTheseFiles: string;
}

export interface ValidatorConfig {
  message?: string;
  type: string;
  validator: (file: File) => boolean;
}

export interface Action
  extends Omit<
    ButtonProps,
    'variant' | 'children' | 'iconOnly' | 'iconRight' | 'iconLeft' | 'isLoading' | keyof MarginProps
  > {
  label: string;
}
