import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  Interpolation,
  SimpleInterpolation,
  ThemeProps,
} from 'styled-components';

export type AllStyleInterpolations =
  | FlattenInterpolation<ThemeProps<DefaultTheme>>
  | FlattenSimpleInterpolation
  | Interpolation<ThemeProps<DefaultTheme>>
  | SimpleInterpolation;
