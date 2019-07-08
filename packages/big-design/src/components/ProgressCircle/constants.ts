export const sizes = {
  large: 80,
  medium: 48,
  small: 32,
  xSmall: 16,
};

export const strokeWidths = {
  large: 8,
  medium: 4,
  small: 4,
  xSmall: 2,
};

export const circumferences = {
  large: (sizes.large / 2 - strokeWidths.large) * 2 * Math.PI,
  medium: (sizes.medium / 2 - strokeWidths.medium) * 2 * Math.PI,
  small: (sizes.small / 2 - strokeWidths.small) * 2 * Math.PI,
  xSmall: (sizes.xSmall / 2 - strokeWidths.xSmall) * 2 * Math.PI,
};
