import { Breakpoints } from '@bigcommerce/big-design-theme';

export type Responsive<T> = { [key in keyof Breakpoints]?: T };

export type ResponsiveProp<T> = T | Responsive<T>;
