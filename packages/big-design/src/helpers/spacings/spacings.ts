import {
  Breakpoints,
  breakpointsOrder,
  Spacing,
  ThemeInterface,
} from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { Responsive } from '../../types';

type SingleSpacingProp<T> = keyof Spacing | T;
type ResponsiveSpacingProp<T> = Responsive<keyof Spacing | T>;
type SpacingProp<T> = SingleSpacingProp<T> | ResponsiveSpacingProp<T>;

type SpacingObject = Record<string, string | 0>;

export function getSpacingStyles<T extends string>(
  spacing: SpacingProp<T>,
  theme: ThemeInterface,
  ...spacingKeys: string[]
) {
  if (typeof spacing === 'object') {
    return getResponsiveSpacings(spacing, theme, spacingKeys);
  }

  if (typeof spacing === 'string') {
    return getSimpleSpacings(spacing, theme, spacingKeys);
  }

  return css``;
}

function isSpacingKey(key: string, theme: ThemeInterface): key is keyof Spacing {
  return key in theme.spacing;
}

function getSimpleSpacings<T extends string>(
  spacing: SingleSpacingProp<T>,
  theme: ThemeInterface,
  spacingKeys: string[],
) {
  return spacingKeys.reduce<SpacingObject>((acc, spacingKey) => {
    if (isSpacingKey(spacing, theme)) {
      acc[spacingKey] = theme.spacing[spacing];
    } else {
      acc[spacingKey] = spacing;
    }

    return acc;
  }, {});
}

function getResponsiveSpacings<T extends string>(
  responsiveSpacing: ResponsiveSpacingProp<T>,
  theme: ThemeInterface,
  spacingKeys: string[],
) {
  const breakpointKeys = Object.keys(responsiveSpacing).sort(
    (a, b) =>
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(a as keyof Breakpoints) -
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      breakpointsOrder.indexOf(b as keyof Breakpoints),
  );

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (breakpointKeys as Array<keyof Breakpoints>).map(
    (breakpointKey) =>
      css`
        ${theme.breakpoints[breakpointKey]} {
          ${getSimpleSpacings(
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            responsiveSpacing[breakpointKey] as keyof Spacing,
            theme,
            spacingKeys,
          )}
        }
      `,
  );
}
