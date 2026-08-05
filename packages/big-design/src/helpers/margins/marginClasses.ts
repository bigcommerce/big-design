import { breakpointsOrder, Spacing } from '@bigcommerce/big-design-theme';

import { ResponsiveProp } from '../../types';

import { MarginProps } from './margins';

type MarginProp = ResponsiveProp<keyof Spacing | 'auto'>;

const toSpacingClass = (prefix: string, value: MarginProp): string[] => {
  if (typeof value !== 'object' || value === null) {
    return [`${prefix}-${value}`];
  }

  return breakpointsOrder.reduce<string[]>((classes, breakpoint) => {
    const spacing = value[breakpoint];

    if (spacing == null) {
      return classes;
    }

    const className = `${prefix}-${spacing}`;

    if (breakpoint === 'mobile') {
      return [...classes, className];
    }

    return [...classes, `${breakpoint}:${className}`];
  }, []);
};

/**
 * Maps public margin system props to Tailwind spacing utility classes.
 * Used by components ported off styled-components / withMargins().
 */
export const marginPropsToClassName = ({
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginVertical,
  marginHorizontal,
}: MarginProps): string => {
  const classes: string[] = [];

  if (margin != null) {
    classes.push(...toSpacingClass('m', margin));
  }

  if (marginTop != null) {
    classes.push(...toSpacingClass('mt', marginTop));
  }

  if (marginRight != null) {
    classes.push(...toSpacingClass('mr', marginRight));
  }

  if (marginBottom != null) {
    classes.push(...toSpacingClass('mb', marginBottom));
  }

  if (marginLeft != null) {
    classes.push(...toSpacingClass('ml', marginLeft));
  }

  if (marginVertical != null) {
    classes.push(...toSpacingClass('my', marginVertical));
  }

  if (marginHorizontal != null) {
    classes.push(...toSpacingClass('mx', marginHorizontal));
  }

  return classes.join(' ');
};
