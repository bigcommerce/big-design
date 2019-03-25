import 'styled-components';

import { ThemeInterface } from '..';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeInterface {}
}
