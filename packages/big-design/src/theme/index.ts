import { themeOptions, ThemeOptions } from './options';
import { createBorder, createBorderRadius, Border, BorderRadius } from './system/border';
import { breakpoints, breakpointValues, Breakpoints, BreakpointValues } from './system/breakpoints';
import { colors, Colors } from './system/colors';
import { elevation, Elevation } from './system/elevation';
import * as keyframes from './system/keyframes';
import { createLineHeight, LineHeight } from './system/line-height';
import { createSpacing, Spacing } from './system/spacing';
import { createTypography, Typography } from './system/typography';
import { zIndex, ZIndex } from './system/z-index';

export * from './helpers';

export interface ThemeInterface {
  border: Border;
  borderRadius: BorderRadius;
  breakpointValues: BreakpointValues;
  breakpoints: Breakpoints;
  colors: Colors;
  elevation: Elevation;
  keyframes: typeof keyframes;
  lineHeight: LineHeight;
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
    elevation,
    keyframes,
    lineHeight: createLineHeight(),
    spacing: createSpacing(),
    typography: createTypography(),
    zIndex,
  };
};

export const defaultTheme: ThemeInterface = createTheme();
