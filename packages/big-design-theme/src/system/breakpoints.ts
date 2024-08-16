export interface BreakpointValues {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

export const breakpointValues: BreakpointValues = {
  mobile: `0px`,
  tablet: `720px`,
  desktop: `1025px`,
  wide: `1500px`,
};

export const breakpoints: Breakpoints = {
  mobile: `@media (min-width: ${breakpointValues.mobile})`,
  tablet: `@media (min-width: ${breakpointValues.tablet})`,
  desktop: `@media (min-width: ${breakpointValues.desktop})`,
  wide: `@media (min-width: ${breakpointValues.wide})`,
};

export const breakpointsOrder: Array<keyof Breakpoints> = ['mobile', 'tablet', 'desktop', 'wide'];
