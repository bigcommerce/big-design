import { createHelpers, Helpers } from './helpers';
import { themeOptions, ThemeOptions } from './options';
import { createBorder, createBorderRadius, Border, BorderRadius } from './system/border';
import { breakpoints, breakpointValues, Breakpoints, BreakpointValues } from './system/breakpoints';
import { colors, Colors } from './system/colors';
import * as keyframes from './system/keyframes';
import { createLineHeight, LineHeight } from './system/line-height';
import { shadow, Shadow } from './system/shadow';
import { createSpacing, Spacing } from './system/spacing';
import { transition, Transition } from './system/transition';
import { createTypography, Typography } from './system/typography';
import { zIndex, ZIndex } from './system/z-index';

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
  transition: Transition;
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
    transition,
    typography: createTypography(),
    zIndex,
  };
};

export const theme: ThemeInterface = createTheme();
