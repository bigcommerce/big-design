import { normalize } from 'polished';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { defaultTheme, ThemeInterface } from '../themes/basic';

const StyledGlobalStyle = createGlobalStyle`
  ${normalize()}

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

interface GlobalStyleProps {
  theme: ThemeInterface;
}

export class GlobalStyle extends React.PureComponent<GlobalStyleProps> {
  static defaultProps: Partial<GlobalStyleProps> = {
    theme: defaultTheme,
  };

  render() {
    return <StyledGlobalStyle {...this.props} />;
  }
}
