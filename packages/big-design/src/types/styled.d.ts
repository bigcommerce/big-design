import 'styled-components';

import { type ThemeInterface } from '@bigcommerce/big-design-theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeInterface {}
}
