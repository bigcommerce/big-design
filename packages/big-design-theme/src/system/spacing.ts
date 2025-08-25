import { remCalc } from '../helpers';

export interface Spacing {
  none: 0;
  xxSmall: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
  xxSmallN: string;
  xSmallN: string;
  smallN: string;
  mediumN: string;
  largeN: string;
  xLargeN: string;
  xxLargeN: string;
  xxxLargeN: string;
}

export const createSpacing = (): Spacing => ({
  none: 0,
  xxSmall: remCalc(4),
  xSmall: remCalc(8),
  small: remCalc(12),
  medium: remCalc(16),
  large: remCalc(20),
  xLarge: remCalc(24),
  xxLarge: remCalc(32),
  xxxLarge: remCalc(48),
  xxSmallN: `-${remCalc(4)}`,
  xSmallN: `-${remCalc(8)}`,
  smallN: `-${remCalc(12)}`,
  mediumN: `-${remCalc(16)}`,
  largeN: `-${remCalc(20)}`,
  xLargeN: `-${remCalc(24)}`,
  xxLargeN: `-${remCalc(32)}`,
  xxxLargeN: `-${remCalc(48)}`,
});