import { addValues, createRGBA } from './helpers';

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
