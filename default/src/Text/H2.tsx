import React from 'react';
import styled from 'styled-components';

import { H2Styles } from './styles';
import { Text } from './Text';

export const StyledH2 = styled.h2`
  ${({ theme }) => theme.H2 || H2Styles}
`;

export class H2 extends Text {
  render() {
    return <StyledH2 {...this.props} />;
  }
}
