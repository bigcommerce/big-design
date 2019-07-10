import React from 'react';

import { sizes } from './constants';
import {
  StyledCircle,
  StyledCircleFiller,
  StyledErrorIcon,
  StyledProgressCircle,
  StyledSuccessIcon,
  StyledText,
} from './styled';

export type ProgressCircleSizes = 'xSmall' | 'small' | 'medium' | 'large';
export type ProgressCircleStatuses = 'complete' | 'error' | 'incomplete' | 'indeterminant';

export interface ProgressCircleProps {
  percent?: number;
  size: ProgressCircleSizes;
  status?: ProgressCircleStatuses;
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    size: 'medium',
    status: 'indeterminant',
  };

  render() {
    const { percent, size, status } = this.props;

    return (
      <>
        {status === 'error' ? (
          <StyledErrorIcon size={sizes[size]} />
        ) : status === 'complete' ? (
          <StyledSuccessIcon size={sizes[size]} />
        ) : status === 'incomplete' ? (
          <StyledProgressCircle
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent ? percent : 0}
            role="progressbar"
            size={size}
          >
            <StyledCircle size={size} />
            <StyledCircleFiller percent={percent ? percent : 0} size={size} status={status} />
            {size === 'large' || size === 'medium' ? (
              <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
            ) : (
              <></>
            )}
          </StyledProgressCircle>
        ) : (
          <StyledProgressCircle role="progressbar" size={size}>
            <StyledCircle size={size} />
            <StyledCircleFiller size={size} status={status} />
          </StyledProgressCircle>
        )}
      </>
    );
  }
}
