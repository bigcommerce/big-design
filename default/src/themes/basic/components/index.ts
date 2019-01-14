import Base from './Base';
import Button from './Button';

export interface Components {
  Base: typeof Base;
  Button: typeof Button;
}

export const components: Components = {
  Base,
  Button,
};
