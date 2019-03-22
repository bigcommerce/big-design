import React from 'react';

import { defaultTheme, ThemeInterface } from '../../theme';
import { Spacing } from '../../theme/system/spacing';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size: keyof Spacing;
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

    return spacing[this.props.size];
  }
}
