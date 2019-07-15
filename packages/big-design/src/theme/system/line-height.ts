import { remCalc } from '../helpers';

export interface LineHeight {
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
}

export const createLineHeight = (): LineHeight => ({
  small: remCalc(20),
  medium: remCalc(24),
  large: remCalc(28),
  xLarge: remCalc(32),
  xxLarge: remCalc(40),
  xxxLarge: remCalc(48),
});
