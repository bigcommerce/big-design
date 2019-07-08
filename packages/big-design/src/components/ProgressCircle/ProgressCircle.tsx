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
  type?: 'determinant' | 'indeterminant';
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    error: false,
    isComplete: false,
    percent: 0,
    type: 'determinant',
  };

  render() {
    const { error, isComplete, percent, size, type } = this.props;

    return (
      <>
        {error ? (
          <StyledErrorIcon size={sizes[size]} />
        ) : isComplete ? (
          <StyledSuccessIcon size={sizes[size]} />
        ) : (
          <StyledProgressBarCircular size={size}>
            <StyledCircle size={size} />
            <StyledFillerCircle percent={percent} size={size} type={type} />

            {type === 'determinant' && (size === 'large' || size === 'medium') ? (
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
