import { em, math, rem, transparentize } from 'polished';
import { css, FlattenSimpleInterpolation } from 'styled-components';

import { themeOptions } from '../options';

export interface Helpers {
  addValues(first: string, second: string): string;
  createRGBA(color: string, alpha: number): string;
  remCalc(value: string | number): string;
  emCalc(value: string | number): string;
  listReset: FlattenSimpleInterpolation;
}

export const addValues = (first: string, second: string) => {
  return math(`${first} + ${second}`);
};

/**
 * Creates and rgba color giving a hex and an amount
 * @param color hex color
 * @param alpha number between 0 and 1
 */
export const createRGBA = (color: string, alpha: number) => {
  const calculatedAmount = 1 - alpha;

  return transparentize(calculatedAmount, color);
};

export const remCalc = (value: string | number) => {
  const { htmlFontSize } = themeOptions.getOptions();

  return rem(value, htmlFontSize);
};

export const emCalc = (value: string | number) => {
  const { htmlFontSize } = themeOptions.getOptions();

  return em(value, htmlFontSize);
};

export const listReset = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
