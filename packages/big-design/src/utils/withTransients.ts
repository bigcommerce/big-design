import isPropValid from '@emotion/is-prop-valid';
import { HTMLProps } from 'react';

type DenoteAsTransient<T> = {
  [K in keyof T as K extends string ? `$${K}` : never]: T[K];
};

type ExcludeHTMLProps<T> = Omit<T, keyof HTMLProps<unknown>>;

type SharedKeys<K1, K2> = K1 extends keyof K2 ? K1 : never;

export type WithTransients<T> = DenoteAsTransient<ExcludeHTMLProps<T>> &
  Pick<T, SharedKeys<keyof T, HTMLProps<unknown>>>;

const isPropValidOrAs = (key: string): key is keyof HTMLProps<unknown> | 'as' =>
  isPropValid(key) || key === 'as';

export const withTransients = <T extends object>(props: T): WithTransients<T> =>
  Object.entries(props).reduce(
    (acc, [key, value]) => ({ ...acc, [isPropValidOrAs(key) ? key : `$${key}`]: value }),
    // Is there a nicer way, not using the as?
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as WithTransients<T>,
  );
