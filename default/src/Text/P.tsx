import React from 'react';
import styled from 'styled-components';

import { PStyles } from './styles';
import { Text } from './Text';

export const StyledP = styled.p`
  ${({ theme }) => theme.P || PStyles}
`;

export class P extends Text {
  render() {
    return <StyledP {...this.props} />;
  }
}
