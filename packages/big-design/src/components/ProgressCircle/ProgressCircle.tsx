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
  isComplete?: boolean;
  percent?: number;
  showError?: boolean;
  size: ProgressCircleSizes;
  variant?: 'determinant' | 'indeterminant';
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    isComplete: false,
    showError: false,
    size: 'medium',
    variant: 'determinant',
  };

  render() {
    const { isComplete, percent, showError, size, variant } = this.props;

    return (
      <>
        {showError ? (
          <StyledErrorIcon
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent ? percent : 0}
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
            aria-valuenow={percent ? percent : 0}
            role="progressbar"
            size={size}
          >
            <StyledCircle size={size} />
            <StyledFillerCircle percent={percent ? percent : 0} size={size} variant={variant} />
            {size === 'large' || size === 'medium' ? (
              <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
            ) : (
              <></>
            )}
          </StyledProgressBarCircular>
        ) : (
          <StyledProgressBarCircular role="progressbar" size={size}>
            <StyledCircle size={size} />
            <StyledFillerCircle size={size} variant={variant} />
          </StyledProgressBarCircular>
        )}
      </>
    );
  }
}
