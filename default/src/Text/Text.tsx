import React from 'react';

import { defaultTheme, ThemeInterface } from '../themes/basic';

export interface TextProps {
  theme: ThemeInterface;
}

export class Text extends React.PureComponent<TextProps> {
  static defaultProps: Partial<TextProps> = {
    theme: defaultTheme,
  };
}
