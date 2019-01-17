import React from 'react';
import styled from 'styled-components';

import { H4Styles } from './styles';
import { Text } from './Text';

export const StyledH4 = styled.h4`
  ${({ theme }) => theme.H4 || H4Styles}
`;

export class H4 extends Text {
  render() {
    return <StyledH4 {...this.props} />;
  }
}
