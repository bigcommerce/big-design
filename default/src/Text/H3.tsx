import React from 'react';
import styled from 'styled-components';

import { H3Styles } from './styles';
import { Text } from './Text';

export const StyledH3 = styled.h3`
  ${({ theme }) => theme.H3 || H3Styles}
`;

export class H3 extends Text {
  render() {
    return <StyledH3 {...this.props} />;
  }
}
