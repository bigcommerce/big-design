import { ThemeInterface } from '@bigcommerce/big-design-theme';
import 'styled-components';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeInterface {}
}
