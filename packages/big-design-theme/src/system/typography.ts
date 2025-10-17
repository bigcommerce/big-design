import { remCalc } from '../helpers';

export type FontFamily = string;

export interface FontWeight {
  extraLight: number;
  light: number;
  regular: number;
  semiBold: number;
}

export interface FontSize {
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
}

export interface Typography {
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
}

export const createTypography = (): Typography => ({
  fontFamily: '"Source Sans 3", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif',
  fontSize: {
    small: remCalc(14),
    medium: remCalc(16),
    large: remCalc(20),
    xLarge: remCalc(24),
    xxLarge: remCalc(32),
    xxxLarge: remCalc(48),
  },
  fontWeight: {
    extraLight: 200,
    light: 300,
    regular: 400,
    semiBold: 600,
  },
});
