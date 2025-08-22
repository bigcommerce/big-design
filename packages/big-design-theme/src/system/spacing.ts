import { remCalc } from '../helpers';

export interface BaseSpacing {
  none: 0;
  xxSmall: string;
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
  xxLarge: string;
  xxxLarge: string;
}

type SpacingKeys = Exclude<keyof BaseSpacing, 'none'>;

type NegativeSpacing = {
  [K in `${SpacingKeys}N`]: string;
};

export type Spacing = BaseSpacing & NegativeSpacing;

// Overloaded helper: strongly typed for real spacing,
// and a loose overload for any string map (keeps implementation simple).
function buildNegativeSpacing(spacing: Pick<BaseSpacing, SpacingKeys>): NegativeSpacing;

function buildNegativeSpacing(spacing: Record<string, string>): Record<string, string> {
  return {
    xxSmallN: `-${spacing.xxSmall}`,
    xSmallN: `-${spacing.xSmall}`,
    smallN: `-${spacing.small}`,
    mediumN: `-${spacing.medium}`,
    largeN: `-${spacing.large}`,
    xLargeN: `-${spacing.xLarge}`,
    xxLargeN: `-${spacing.xxLarge}`,
    xxxLargeN: `-${spacing.xxxLarge}`,
  };
}

export const createSpacing = (): Spacing => {
  const spacing: BaseSpacing = {
    none: 0,
    xxSmall: remCalc(4),
    xSmall: remCalc(8),
    small: remCalc(12),
    medium: remCalc(16),
    large: remCalc(20),
    xLarge: remCalc(24),
    xxLarge: remCalc(32),
    xxxLarge: remCalc(48),
  };

  // Destructure to drop `none`, pass the rest to the overloaded builder.
  const { none: _none, ...positives } = spacing;
  const negativeSpacing = buildNegativeSpacing(positives);

  return {
    ...spacing,
    ...negativeSpacing,
  };
};
