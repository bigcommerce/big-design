export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const breakpoints: Breakpoints = {
  mobile: `@media (min-width: 0px)`,
  tablet: `@media (min-width: 720px)`,
  desktop: `@media (min-width: 1025px)`,
};

export const breakpointsOrder: Array<keyof Breakpoints> = ['mobile', 'tablet', 'desktop'];
