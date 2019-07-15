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
});
