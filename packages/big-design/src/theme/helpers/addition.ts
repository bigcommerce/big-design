import { stripUnit } from 'polished';

export const addValues = (first: string, second: string) => {
  const [firstValue, firstUnit] = stripUnit(first, true);
  const [secondValue, secondUnit] = stripUnit(second, true);

  if (firstUnit !== secondUnit) {
    throw new Error('units need to be of the same kind');
  }

  return `${Number(firstValue) + Number(secondValue)}${firstUnit}`;
};
