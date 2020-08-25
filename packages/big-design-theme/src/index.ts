import { createHelpers, Helpers } from './helpers';
import { ThemeOptions, themeOptions } from './options';
import { Border, BorderRadius, createBorder, createBorderRadius } from './system/border';
import { Breakpoints, breakpoints, BreakpointValues, breakpointValues } from './system/breakpoints';
import { Colors, colors } from './system/colors';
import * as keyframes from './system/keyframes';
import { createLineHeight, LineHeight } from './system/line-height';
import { Shadow, shadow } from './system/shadow';
import { createSpacing, Spacing } from './system/spacing';
import { createTypography, Typography } from './system/typography';
import { ZIndex, zIndex } from './system/z-index';

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
    keyframes,
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
