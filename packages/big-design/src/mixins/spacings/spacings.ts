/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { breakpointsOrder, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
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
    // @ts-expect-error refactor types
    (a, b) => breakpointsOrder.indexOf(a) - breakpointsOrder.indexOf(b),
  );

  return breakpointKeys.map(
    (breakpointKey) =>
      css`
        ${/* @ts-expect-error fix types */ ''}
        ${theme.breakpoints[breakpointKey]} {
          ${/* @ts-expect-error refactor types */ ''}
          ${getSimpleSpacings(responsiveSpacing[breakpointKey], theme, spacingKeys)}
        }
      `,
  );
}
