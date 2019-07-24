import { remCalc, theme as defaultTheme, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

export class Icon extends React.PureComponent<IconProps> {
  static defaultProps: Partial<IconProps> = {
    size: 'large',
  };

  protected getSize() {
    const theme = this.props.theme || defaultTheme;
    const { spacing } = theme;
    const { size } = this.props;

    return typeof size === 'string' ? spacing[size] : remCalc(size);
  }
}
