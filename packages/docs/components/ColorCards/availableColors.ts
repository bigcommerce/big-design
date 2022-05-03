import { ThemeInterface } from '@bigcommerce/big-design-theme';

type Colors = ThemeInterface['colors'];
type Color = keyof Colors;

export interface ColorDetails {
  contrast?: 'AAA' | 'AA' | 'A';
  description?: {
    text: string;
    href?: string;
  };
  name: Color;
  secondaryTextColor?: Color;
  textColor: Color;
}

export const accentColors: ColorDetails[] = [
  { contrast: 'AA', name: 'primary40', textColor: 'white' },
  { contrast: 'AAA', name: 'primary10', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'primary20', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'primary30', textColor: 'secondary70' },
  { contrast: 'AA', name: 'primary50', textColor: 'white' },
  { contrast: 'AAA', name: 'primary60', textColor: 'white' },
  { contrast: 'AAA', name: 'primary70', textColor: 'white' },
];

export const typeColors: ColorDetails[] = [
  { contrast: 'AAA', name: 'secondary70', textColor: 'white' },
  { contrast: 'AA', name: 'secondary60', textColor: 'white' },
  { contrast: 'A', name: 'secondary50', secondaryTextColor: 'secondary70', textColor: 'white' },
  { contrast: 'AAA', name: 'white', textColor: 'secondary70' },
];

export const fillsAndStrokesColors: ColorDetails[] = [
  { contrast: 'AAA', name: 'white', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'secondary10', textColor: 'secondary70' },
  { contrast: 'AA', name: 'secondary20', textColor: 'secondary70' },
  { contrast: 'A', name: 'secondary30', textColor: 'secondary70' },
  { contrast: 'A', name: 'secondary40', textColor: 'secondary70' },
];

export const statusSuccessColors: ColorDetails[] = [
  { contrast: 'AA', name: 'success40', textColor: 'white' },
  { contrast: 'AAA', name: 'success10', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'success20', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'success30', textColor: 'secondary70' },
  { contrast: 'AA', name: 'success50', textColor: 'white' },
  { contrast: 'AAA', name: 'success60', textColor: 'white' },
  { contrast: 'AAA', name: 'success70', textColor: 'white' },
];

export const statusDangerColors: ColorDetails[] = [
  { contrast: 'AA', name: 'danger40', textColor: 'white' },
  { contrast: 'AAA', name: 'danger10', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'danger20', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'danger30', textColor: 'secondary70' },
  { contrast: 'AA', name: 'danger50', textColor: 'white' },
  { contrast: 'AAA', name: 'danger60', textColor: 'white' },
  { contrast: 'AAA', name: 'danger70', textColor: 'white' },
];

export const statusWarningColors: ColorDetails[] = [
  { contrast: 'AA', name: 'warning40', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'warning10', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'warning20', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'warning30', textColor: 'secondary70' },
  { contrast: 'AA', name: 'warning50', textColor: 'secondary70' },
  { contrast: 'AAA', name: 'warning60', textColor: 'secondary70' },
  { contrast: 'A', name: 'warning70', secondaryTextColor: 'white', textColor: 'secondary70' },
];

export const additionalColors: ColorDetails[] = [
  {
    description: {
      text: 'Current value of an element’s color property.',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword',
    },
    name: 'currentColor',
    textColor: 'white',
  },
  {
    description: {
      text: 'Element inherits value from parent element.',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/inherit',
    },
    name: 'inherit',
    textColor: 'secondary70',
  },
  {
    description: {
      text: 'Renders background behind colored item completely visible.',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#transparent_keyword',
    },
    name: 'transparent',
    textColor: 'secondary70',
  },
  {
    contrast: 'AA',
    description: {
      text: 'Used by BigCommerce branded assets.',
      href: '',
    },
    name: 'brand',
    textColor: 'white',
  },
];
