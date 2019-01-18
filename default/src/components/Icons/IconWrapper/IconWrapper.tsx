import React from 'react';
import styled from 'styled-components';

import { IconWrapperStyles } from './styles';

export interface IconWrapperProps {
  height: number | string;
  width: number | string;
}

export class IconWrapper extends React.PureComponent<IconWrapperProps> {
  static defaultProps: Partial<IconWrapperProps> = {
    height: 20,
    width: 20,
  };

  render() {
    return <StyledIconWrapper {...this.props} />;
  }
}

const StyledIconWrapper = styled.span<IconWrapperProps>`
  ${({ theme }) => theme.IconWrapper || IconWrapperStyles}
`;
