import { breakpoints, Breakpoints } from './system/breakpoints';
import { elevation, Elevation } from './system/elevation';
import { createLineHeight, LineHeight } from './system/line-height';
import { colors, Colors } from './system/palette';
import { createSpacing, Spacing } from './system/spacing';
import { createTypography, Typography } from './system/typography';
import { zIndex, ZIndex } from './system/z-index';

export interface ThemeOptions {
  htmlFontSize: number;
}

const defaultOptions: ThemeOptions = {
  htmlFontSize: 16,
};

export interface Theme {
  breakpoints: Breakpoints;
  colors: Colors;
  elevation: Elevation;
  lineHeight: LineHeight;
  spacing: Spacing;
  typography: Typography;
  zIndex: ZIndex;
}

export const createTheme = (themeOptions?: Partial<ThemeOptions>): Theme => {
  const options: ThemeOptions = {
    ...defaultOptions,
    ...themeOptions,
  };

  return {
    breakpoints,
    colors,
    elevation,
    lineHeight: createLineHeight(options),
    spacing: createSpacing(options),
    typography: createTypography(options),
    zIndex,
  };
};

export const theme: Theme = createTheme();
