export interface Breakpoints {
  medium: string;
  large: string;
}

export const breakpoints: Breakpoints = {
  medium: `@media (min-width: 720px)`,
  large: `@media (min-width: 1025px)`,
};
