import {
  Breakpoints,
  breakpointsOrder,
  Spacing,
  ThemeInterface,
} from '@bigcommerce/big-design-theme';
import { css } from 'styled-components';

import { Responsive } from '../../types';

type SingleSpacingProp = keyof Spacing;
type ResponsiveSpacingProp = Responsive<keyof Spacing>;
type SpacingProp = SingleSpacingProp | ResponsiveSpacingProp;

interface SpacingObject {
  [key: string]: string | 0;
}

export function getSpacingStyles(
  spacing: SpacingProp,
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

function getSimpleSpacings(
  spacing: SingleSpacingProp,
  theme: ThemeInterface,
  spacingKeys: string[],
) {
  return spacingKeys.reduce<SpacingObject>((acc, spacingKey) => {
    acc[spacingKey] = theme.spacing[spacing];

    return acc;
  }, {});
}

function getResponsiveSpacings(
  responsiveSpacing: ResponsiveSpacingProp,
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
