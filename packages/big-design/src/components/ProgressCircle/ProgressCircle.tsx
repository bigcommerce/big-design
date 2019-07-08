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
  behavior?: 'determinant' | 'indeterminant';
  error?: boolean;
  isComplete?: boolean;
  percent?: number;
  size: ProgressCircleSizes;
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    behavior: 'determinant',
    error: false,
    isComplete: false,
    percent: 0,
  };

  render() {
    const { behavior, error, isComplete, percent, size } = this.props;

    return (
      <>
        {error ? (
          <StyledErrorIcon size={sizes[size]} />
        ) : isComplete ? (
          <StyledSuccessIcon size={sizes[size]} />
        ) : (
          <StyledProgressBarCircular size={size}>
            <StyledCircle size={size} />
            <StyledFillerCircle behavior={behavior} percent={percent} size={size} />

            {behavior === 'determinant' && (size === 'large' || size === 'medium') ? (
              <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
            ) : (
              <>SR only</>
            )}
          </StyledProgressBarCircular>
        )}
      </>
    );
  }
}
