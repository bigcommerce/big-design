import { getValueAndUnit } from 'polished';

export const addValues = (first: string, second: string) => {
  const [firstValue, firstUnit] = getValueAndUnit(first);
  const [secondValue, secondUnit] = getValueAndUnit(second);

  if (firstUnit !== secondUnit) {
    throw new Error('units need to be of the same kind');
  }

  return `${Number(firstValue) + Number(secondValue)}${firstUnit}`;
};
