import { components, Components } from './components';
import { breakpoints, Breakpoints } from './system/breakpoints';
import { colors, Colors } from './system/colors';
import { elevation, Elevation } from './system/elevation';
import * as keyframes from './system/keyframes';
import { createLineHeight, LineHeight } from './system/line-height';
import { createSpacing, Spacing } from './system/spacing';
import { createTypography, Typography } from './system/typography';
import { zIndex, ZIndex } from './system/z-index';

export interface ThemeOptions {
  htmlFontSize: number;
}

const defaultOptions: ThemeOptions = {
  htmlFontSize: 16,
};

export interface ThemeInterface extends Components {
  breakpoints: Breakpoints;
  colors: Colors;
  elevation: Elevation;
  keyframes: typeof keyframes;
  lineHeight: LineHeight;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndex;
}

export const createTheme = (themeOptions?: Partial<ThemeOptions>): ThemeInterface => {
  const options: ThemeOptions = {
    ...defaultOptions,
    ...themeOptions,
  };

  return {
    ...components,
    breakpoints,
    colors,
    elevation,
    keyframes,
    lineHeight: createLineHeight(options),
    spacing: createSpacing(options),
    typography: createTypography(options),
    zIndex,
  };
};

export const theme: ThemeInterface = createTheme();
