import React, { memo, ReactNode } from 'react';

import { BoxProps } from '../../Box';

import { StyledPanelContents, StyledPanelContentsWrapper } from './styled';

export interface PanelContentProps extends BoxProps {
  children?: ReactNode;
  padded?: boolean;
  height?: string;
  scrollable?: boolean;
}

export const PanelContents: React.FC<PanelContentProps> = memo(({ children, ...props }) => {
  return (
    <StyledPanelContentsWrapper {...props}>
      <StyledPanelContents {...props}>{children}</StyledPanelContents>
    </StyledPanelContentsWrapper>
  );
});

PanelContents.displayName = 'PanelContents';
