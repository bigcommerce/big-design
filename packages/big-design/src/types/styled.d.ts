import 'styled-components';

import { ThemeInterface } from '@bigcommerce/big-design-theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
