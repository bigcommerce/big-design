import React from 'react';

import { StyledProgressBar, StyledProgressBarFiller } from './styled';

export interface ProgressBarProps {
  percent?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return typeof percent === 'number' ? (
    <StyledProgressBar aria-valuemax={100} aria-valuemin={0} aria-valuenow={percent} role="progressbar">
      <StyledProgressBarFiller percent={percent} />
    </StyledProgressBar>
  ) : (
    <StyledProgressBar role="progressbar">
      <StyledProgressBarFiller />
    </StyledProgressBar>
  );
};
