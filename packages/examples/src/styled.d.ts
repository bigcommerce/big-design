import { ThemeInterface } from '@bigcommerce/big-design-theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {} // tslint:disable-line
}
