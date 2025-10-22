import 'styled-components';

import { ThemeInterface } from '..';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeInterface {}
}
