import {
  type Breakpoints,
  breakpointsOrder,
  type CSSRules,
  type ThemeInterface,
} from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import type { DisplayOverload, DisplayProps, TransientDisplayProps } from './types';

export const withDisplay = () => css<TransientDisplayProps>`
  ${({ $display, theme }) => $display && getDisplayStyles($display, theme, 'display')};
`;

// Rename-and-keep helper: maps the public `display` prop to its transient (`$`-prefixed)
// name for hand-off to a tag-target styled component.
export function toTransientDisplayProps(props: DisplayProps): TransientDisplayProps {
  return { $display: props.display };
}

const getDisplayStyles: DisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: any,
): CSSRules => {
  if (typeof displayProp === 'object') {
    return getResponsiveDisplay(displayProp, theme, cssKey);
  }

  if (typeof displayProp === 'string' || typeof displayProp === 'number') {
    return getSimpleDisplay(displayProp, cssKey);
  }

  return [];
};

const getSimpleDisplay = (displayProp: string | number, cssKey: string): CSSRules => css`
  ${cssKey}: ${displayProp}
`;

const getResponsiveDisplay: DisplayOverload = (
  displayProp: any,
  theme: ThemeInterface,
  cssKey: string,
): CSSRules[] => {
  const breakpointKeys = Object.keys(displayProp).sort(
    (firstBreakpoint, secondBreakpoint) =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(firstBreakpoint as keyof Breakpoints) -
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(secondBreakpoint as keyof Breakpoints),
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (breakpointKeys as Array<keyof Breakpoints>).map(
    (breakpointKey) => css`
      ${theme.breakpoints[breakpointKey]} {
        ${''}
        ${getSimpleDisplay(displayProp[breakpointKey], cssKey)}
      }
    `,
  );
};
