import { ButtonProps } from '../Button';

export interface Localization {
  upload: string;
  optional: string;
  showLess: string;
  showMore: string;
  canNotUploadTheseFiles: string;
}

export interface ValidatorConfig {
  message?: string;
  type: string;
  validator: (file: File) => boolean;
}

export interface Action extends Omit<ButtonProps, 'variant'> {
  label: string;
}
