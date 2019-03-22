export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export const breakpoints: Breakpoints = {
  mobile: `@media (max-width: 719px)`,
  tablet: `@media (min-width: 720px)`,
  desktop: `@media (min-width: 1025px)`,
};
