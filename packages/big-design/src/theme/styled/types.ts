import { DefaultTheme, FlattenInterpolation, SimpleInterpolation, ThemeProps } from 'styled-components';

export type AllStyleInterpolations = SimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>;
