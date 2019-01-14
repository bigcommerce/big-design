import { size } from 'polished';
import * as React from 'react';
import styled from 'styled-components';

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

export const StyledIconWrapper = styled.span<IconWrapperProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ height, width }) => size(height, width)};
`;
