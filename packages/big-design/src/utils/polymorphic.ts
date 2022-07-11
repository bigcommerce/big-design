// Types from https://github.com/kripod/react-polymorphic-types with a few modifications for Big Design.

// Block external access to auxiliary types
export {};

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<
  P,
  T extends React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = P & {
  as?: T extends keyof JSX.IntrinsicElements ? (T extends S ? T : never) : never;
};

export type PolymorphicPropsWithoutRef<
  P,
  T extends React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T, S>
>;

export type PolymorphicPropsWithRef<
  P,
  T extends React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithRef<T>,
  PropsWithAs<P, T, S>
>;

type PolymorphicExoticComponent<
  P = Record<string, unknown>,
  T extends React.ElementType = React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  /**
   * **NOTE**: Exotic components are not callable.
   */
  <InstanceT extends React.ElementType = T>(
    props: PolymorphicPropsWithRef<P, InstanceT, S>,
  ) => React.ReactElement | null
>;

export type PolymorphicForwardRefExoticComponent<
  P,
  T extends React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, T, S>
>;

export type PolymorphicMemoExoticComponent<
  P,
  T extends React.ElementType,
  S extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
> = Merge<React.MemoExoticComponent<React.ComponentType<any>>, PolymorphicExoticComponent<P, T, S>>;
