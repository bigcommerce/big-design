import React from 'react';

import { defaultTheme, ThemeInterface } from '../../theme';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size: 'small' | 'medium' | 'large' | 'xLarge';
  theme?: ThemeInterface;
  title?: string;
}

export class Icon extends React.PureComponent<IconProps> {
  static defaultProps: Partial<IconProps> = {
    size: 'small',
  };

  protected getSize() {
    const sizeMap = this.getSizeMap();

    return sizeMap[this.props.size];
  }

  private getSizeMap() {
    const theme = this.props.theme || defaultTheme;
    const { spacing } = theme;

    return {
      small: spacing.large,
      medium: spacing.xLarge,
      large: spacing.xxLarge,
      xLarge: spacing.xxxLarge,
    };
  }
}
