import React from 'react';

import {
  StyledCircle,
  StyledFillerCircle,
  StyledFillerLinear,
  StyledProgressBarCircular,
  StyledProgressBarLinear,
} from './styled';

export interface ProgressBarProps {
  behavior?: 'determinant' | 'indeterminant';
  error?: boolean;
  isComplete?: boolean;
  percent?: number;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: Partial<ProgressBarProps> = {
    behavior: 'determinant',
    error: false,
    isComplete: false,
    percent: 0,
    size: 'medium',
    variant: 'linear',
  };

  render() {
    const { behavior, percent, variant } = this.props;

    return variant === 'linear' ? (
      <StyledProgressBarLinear>
        <StyledFillerLinear behavior={behavior} percent={percent} variant={variant} />
      </StyledProgressBarLinear>
    ) : (
      <StyledProgressBarCircular>
        <StyledCircle />
        <StyledFillerCircle behavior={behavior} percent={percent} />
      </StyledProgressBarCircular>
    );
  }
}
