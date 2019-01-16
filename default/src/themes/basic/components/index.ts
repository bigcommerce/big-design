import Base from './Base';
import Button from './Button';
import * as Spinner from './Spinner';

export interface Components {
  Base: typeof Base;
  Button: typeof Button;
  Spinner: typeof Spinner;
}

export const components: Components = {
  Base,
  Button,
  Spinner,
};
