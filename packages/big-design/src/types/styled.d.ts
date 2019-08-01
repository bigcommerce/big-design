import 'styled-components';

import { ThemeInterface } from '@bigcommerce/big-design-theme';

declare module 'styled-components' {
  // tslint:disable-next-line
  export interface DefaultTheme extends ThemeInterface {}
}
