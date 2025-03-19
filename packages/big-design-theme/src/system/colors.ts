export interface Gradient {
  start: string;
  end: string;
}

export interface Colors {
  currentColor: string;
  inherit: string;
  transparent: string;

  white: string;
  brand: string;

  secondary: string;
  secondary10: string;
  secondary20: string;
  secondary30: string;
  secondary40: string;
  secondary50: string;
  secondary60: string;
  secondary70: string;

  primary: string;
  primary10: string;
  primary20: string;
  primary30: string;
  primary40: string;
  primary50: string;
  primary60: string;
  primary70: string;

  primaryGradient: Gradient;

  danger: string;
  danger10: string;
  danger20: string;
  danger30: string;
  danger40: string;
  danger50: string;
  danger60: string;
  danger70: string;

  dangerGradient: Gradient;

  warning: string;
  warning10: string;
  warning20: string;
  warning30: string;
  warning40: string;
  warning50: string;
  warning60: string;
  warning70: string;
  
  warningGradient: Gradient;

  success: string;
  success10: string;
  success20: string;
  success30: string;
  success40: string;
  success50: string;
  success60: string;
  success70: string;

  successGradient: Gradient;
}

export const colors: Colors = {
  currentColor: 'currentColor',
  inherit: 'inherit',
  transparent: 'transparent',

  white: '#FFFFFF',
  brand: '#273A8A',

  secondary: '#B4BAD1',
  secondary10: '#F6F7FC',
  secondary20: '#ECEEF5',
  secondary30: '#D9DCE9',
  secondary40: '#B4BAD1',
  secondary50: '#8C93AD',
  secondary60: '#5E637A',
  secondary70: '#313440',

  primary: '#3C64F4',
  primary10: '#F0F3FF',
  primary20: '#DBE3FE',
  primary30: '#9EB3FC',
  primary40: '#3C64F4',
  primary50: '#2852EB',
  primary60: '#0B38D9',
  primary70: '#0024A6',

  primaryGradient: {
    start: 'rgb(114, 215, 219)',
    end: 'rgb(217, 249, 250)',
  },

  danger: '#DB3643',
  danger10: '#FFF0F1',
  danger20: '#FEDBDE',
  danger30: '#FC9EA6',
  danger40: '#DB3643',
  danger50: '#CC1F1F',
  danger60: '#AD0000',
  danger70: '#80000B',

  dangerGradient: {
    start: 'rgb(235, 178, 202)',
    end: 'rgb(238, 232, 250)',
  },

  warning: '#FFBF00',
  warning10: '#FFF9E6',
  warning20: '#FFF0BF',
  warning30: '#FFE180',
  warning40: '#FFBF00',
  warning50: '#FFAE00',
  warning60: '#E58F17',
  warning70: '#CC720A',

  warningGradient: {
    start: 'rgb(239, 199, 121)',
    end: 'rgb(254, 251, 242)',
  },

  success: '#2AAB3F',
  success10: '#EEFCF0',
  success20: '#D3F5D9',
  success30: '#88D895',
  success40: '#2AAB3F',
  success50: '#208831',
  success60: '#146622',
  success70: '#004D0D',

  successGradient: {
    start: 'rgb(120, 228, 163)',
    end: 'rgb(243, 253, 236)',
  },
};
