export interface BreakpointValues {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const breakpointValues: BreakpointValues = {
  mobile: `0px`,
  tablet: `720px`,
  desktop: `1025px`,
};

export const breakpoints: Breakpoints = {
  mobile: `@media (min-width: ${breakpointValues.mobile})`,
  tablet: `@media (min-width: ${breakpointValues.tablet})`,
  desktop: `@media (min-width: ${breakpointValues.desktop})`,
};

export const breakpointsOrder: Array<keyof Breakpoints> = ['mobile', 'tablet', 'desktop'];
