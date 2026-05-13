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

type UnknownRecord = Record<string, unknown>;

const mergedThemeCache = new WeakMap<object, ThemeInterface>();

const isPlainObject = (value: unknown): value is UnknownRecord => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
};

const mergeThemeValue = (baseValue: unknown, overrideValue: unknown): unknown => {
  if (!isPlainObject(baseValue) || !isPlainObject(overrideValue)) {
    return overrideValue === undefined ? baseValue : overrideValue;
  }

  const result = Object.fromEntries(Object.entries(baseValue));

  Object.keys(overrideValue).forEach((key) => {
    result[key] = mergeThemeValue(result[key], overrideValue[key]);
  });

  return result;
};

export const getDefaultedTheme = (customTheme: unknown): ThemeInterface => {
  if (!isPlainObject(customTheme) || Object.keys(customTheme).length === 0) {
    return theme;
  }

  if (Object.is(customTheme, theme)) {
    return theme;
  }

  const cachedTheme = mergedThemeCache.get(customTheme);

  if (cachedTheme) {
    return cachedTheme;
  }

  const mergedTheme = Object.assign({}, theme, mergeThemeValue(theme, customTheme));

  mergedThemeCache.set(customTheme, mergedTheme);

  return mergedTheme;
};

export const withDefaultTheme = (props: { theme?: unknown }): { theme: ThemeInterface } => ({
  theme: getDefaultedTheme(props.theme),
});

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {} // eslint-disable-line
}
