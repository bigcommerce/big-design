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

const BaseSpacingValues: BaseSpacing = {
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

type SpacingKeys = Exclude<keyof BaseSpacing, 'none'>;

// Slightly stronger typing for the values: they’re strings prefixed with '-'
type NegativeString = `-${string}`;

type NegativeSpacing = {
  [K in `${SpacingKeys}N`]: NegativeString;
};

export type Spacing = BaseSpacing & NegativeSpacing;

// Overloaded helper: strongly typed for real spacing,
// and a loose overload for any string map (keeps implementation simple).
function buildNegativeSpacing(spacing: Pick<BaseSpacing, SpacingKeys>): NegativeSpacing;

function buildNegativeSpacing(spacing: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(spacing).map(([k, v]) => [`${k}N`, `-${v}`]));
}

export const createSpacing = (): Spacing => {
  const spacing: BaseSpacing = BaseSpacingValues;

  // Drop `none`; everything left gets a negative twin automatically.
  const { none: _none, ...positives } = spacing;
  const negativeSpacing = buildNegativeSpacing(positives);

  return {
    ...spacing,
    ...negativeSpacing,
  };
};
