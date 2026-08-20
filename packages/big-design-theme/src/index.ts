import { createHelpers, type Helpers } from './helpers';
import { type ThemeOptions, themeOptions } from './options';
import { type Border, type BorderRadius, createBorder, createBorderRadius } from './system/border';
import {
  type Breakpoints,
  breakpoints,
  type BreakpointValues,
  breakpointValues,
} from './system/breakpoints';
import { type Colors, colors } from './system/colors';
import * as keyframes from './system/keyframes';
import { createLineHeight, type LineHeight } from './system/line-height';
import { type Shadow, shadow } from './system/shadow';
import { createSpacing, type Spacing } from './system/spacing';
import { createTypography, type Typography } from './system/typography';
import { type ZIndex, zIndex } from './system/z-index';

export * from './helpers';
export * from './system';

export interface ThemeInterface {
  border: Border;
  borderRadius: BorderRadius;
  breakpointValues: BreakpointValues;
  breakpoints: Breakpoints;
  colors: Colors;
  helpers: Helpers;
  keyframes: typeof keyframes;
  lineHeight: LineHeight;
  shadow: Shadow;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndex;
}

export const createTheme = (customOptions: Partial<ThemeOptions> = {}): ThemeInterface => {
  themeOptions.setOptions(customOptions);

  return {
    border: createBorder(),
    borderRadius: createBorderRadius(),
    breakpointValues,
    breakpoints,
    colors,
    helpers: createHelpers(),
    // Spread into a plain object: styled-components 6 deep-merges themes when folding
    // defaultProps (mixinDeep), which throws on a getter-only module namespace object.
    keyframes: { ...keyframes },
    lineHeight: createLineHeight(),
    shadow,
    spacing: createSpacing(),
    typography: createTypography(),
    zIndex,
  };
};

export const theme: ThemeInterface = createTheme();

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {} // eslint-disable-line
}
