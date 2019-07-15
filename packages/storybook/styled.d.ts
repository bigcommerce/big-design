import { ThemeInterface } from '@bigcommerce/big-design';
import 'styled-components';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeInterface {}
}
