import React from 'react';
import styled from 'styled-components';

import { H1Styles } from './styles';
import { Text } from './Text';

export const StyledH1 = styled.h1`
  ${({ theme }) => theme.H1 || H1Styles}
`;

export class H1 extends Text {
  render() {
    return <StyledH1 {...this.props} />;
  }
}
