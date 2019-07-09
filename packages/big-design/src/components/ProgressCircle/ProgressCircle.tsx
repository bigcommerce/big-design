import React from 'react';

import { sizes } from './constants';
import {
  StyledCircle,
  StyledErrorIcon,
  StyledFillerCircle,
  StyledProgressBarCircular,
  StyledSuccessIcon,
  StyledText,
} from './styled';

export type ProgressCircleSizes = 'xSmall' | 'small' | 'medium' | 'large';

export interface ProgressCircleProps {
  error?: boolean;
  isComplete?: boolean;
  percent?: number;
  size: ProgressCircleSizes;
  variant?: 'determinant' | 'indeterminant';
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    error: false,
    isComplete: false,
    percent: 0,
    size: 'medium',
    variant: 'determinant',
  };

  render() {
    const { error, isComplete, percent, size, variant } = this.props;

    return (
      <>
        {error ? (
          <StyledErrorIcon
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent}
            role="progressbar"
            size={sizes[size]}
          />
        ) : isComplete ? (
          <StyledSuccessIcon
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={100}
            role="progressbar"
            size={sizes[size]}
          />
        ) : variant === 'determinant' ? (
          <StyledProgressBarCircular
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent}
            role="progressbar"
            size={size}
          >
            <StyledCircle size={size} />
            <StyledFillerCircle percent={percent} size={size} variant={variant} />
            {size === 'large' || size === 'medium' ? (
              <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
            ) : (
              <></>
            )}
          </StyledProgressBarCircular>
        ) : (
          <StyledProgressBarCircular role="progressbar" size={size}>
            <StyledCircle size={size} />
            <StyledFillerCircle percent={percent} size={size} variant={variant} />
          </StyledProgressBarCircular>
        )}
      </>
    );
  }
}
