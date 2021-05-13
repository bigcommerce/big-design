import { themeOptions } from '../options';

import { addValues, createRGBA, emCalc, remCalc } from './helpers';

describe('addValues', () => {
  test('adds px', () => {
    const result = addValues('1px', '2px');

    expect(result).toBe('3px');
  });

  test('adds rem', () => {
    const result = addValues('1rem', '2rem');

    expect(result).toBe('3rem');
  });

  test("throws when units don't match", () => {
    expect(() => addValues('1px', '1rem')).toThrowError();
  });
});

describe('createRGBA', () => {
  test('converts a hex color to rgba', () => {
    const result = createRGBA('#fff', 0.7);
    const expected = 'rgba(255,255,255,0.7)';

    expect(result).toBe(expected);
  });

  test('returns same hex when giving a an alpha of 1', () => {
    const result = createRGBA('#fff', 1);
    const expected = '#fff';

    expect(result).toBe(expected);
  });

  test('treats alpha >= 1 the same way', () => {
    const expected = '#fff';

    expect(createRGBA('#fff', 1)).toBe(expected);
    expect(createRGBA('#fff', 1.5)).toBe(expected);
    expect(createRGBA('#fff', 2)).toBe(expected);
  });

  test('treats alpha <= 0 the same way', () => {
    const expected = 'rgba(255,255,255,0)';

    expect(createRGBA('#fff', 0)).toBe(expected);
    expect(createRGBA('#fff', -1)).toBe(expected);
    expect(createRGBA('#fff', -2)).toBe(expected);
  });
});

describe('remCal', () => {
  beforeEach(() => {
    themeOptions.setOptions({ htmlFontSize: 16 });
  });

  test('returns correct rem size off of default font size', () => {
    const result = remCalc(4);
    const expected = '0.25rem';

    expect(result).toEqual(expected);
  });

  test('returns correct rem size off of modified default font size', () => {
    themeOptions.setOptions({ htmlFontSize: 14 });

    const result = remCalc(7);
    const expected = '0.5rem';

    expect(result).toEqual(expected);
  });
});

describe('emCal', () => {
  beforeEach(() => {
    themeOptions.setOptions({ htmlFontSize: 16 });
  });

  test('returns correct em size off of default font size', () => {
    const result = emCalc(4);
    const expected = '0.25em';

    expect(result).toEqual(expected);
  });

  test('returns correct em size off of modified default font size', () => {
    themeOptions.setOptions({ htmlFontSize: 14 });

    const result = emCalc(7);
    const expected = '0.5em';

    expect(result).toEqual(expected);
  });
});
