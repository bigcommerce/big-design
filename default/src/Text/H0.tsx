import React from 'react';
import styled from 'styled-components';

import { H0Styles } from './styles';
import { Text } from './Text';

export const StyledH0 = styled.h1`
  ${({ theme }) => theme.H0 || H0Styles}
`;

export class H0 extends Text {
  render() {
    return <StyledH0 {...this.props} />;
  }
}
