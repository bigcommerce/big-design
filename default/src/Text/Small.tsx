import React from 'react';
import styled from 'styled-components';

import { SmallStyles } from './styles';
import { Text } from './Text';

export const StyledSmall = styled.small`
  ${({ theme }) => theme.Small || SmallStyles}
`;

export class Small extends Text {
  render() {
    return <StyledSmall {...this.props} />;
  }
}
