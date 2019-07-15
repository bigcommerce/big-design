export const CIRCLE_DIMENSIONS = {
  large: 80,
  medium: 48,
  small: 32,
  xSmall: 16,
};

export const CIRCLE_STROKE_WIDTHS = {
  large: 8,
  medium: 4,
  small: 4,
  xSmall: 2,
};

export const CIRCLE_CIRCUMFERENCES = {
  large: (CIRCLE_DIMENSIONS.large / 2 - CIRCLE_STROKE_WIDTHS.large / 2) * 2 * Math.PI,
  medium: (CIRCLE_DIMENSIONS.medium / 2 - CIRCLE_STROKE_WIDTHS.medium / 2) * 2 * Math.PI,
  small: (CIRCLE_DIMENSIONS.small / 2 - CIRCLE_STROKE_WIDTHS.small / 2) * 2 * Math.PI,
  xSmall: (CIRCLE_DIMENSIONS.xSmall / 2 - CIRCLE_STROKE_WIDTHS.xSmall / 2) * 2 * Math.PI,
};
