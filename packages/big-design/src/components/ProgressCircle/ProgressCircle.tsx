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
export type ProgressCircleStates = 'complete' | 'error' | 'incomplete' | 'indeterminant';

export interface ProgressCircleProps {
  percent?: number;
  size: ProgressCircleSizes;
  state?: ProgressCircleStates;
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static defaultProps: Partial<ProgressCircleProps> = {
    size: 'medium',
    state: 'indeterminant',
  };

  render() {
    const { percent, size, state } = this.props;

    switch (state) {
      case 'error':
        return <StyledErrorIcon size={sizes[size]} />;
      case 'complete':
        return <StyledSuccessIcon size={sizes[size]} />;
      case 'incomplete':
        return (
          <StyledProgressCircle
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent ? percent : 0}
            role="progressbar"
            size={size}
          >
            <StyledCircle size={size} />
            <StyledCircleFiller percent={percent ? percent : 0} size={size} state={state} />
            {size === 'large' || size === 'medium' ? (
              <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
            ) : (
              <></>
            )}
          </StyledProgressCircle>
        );
      case 'indeterminant':
        return (
          <StyledProgressCircle role="progressbar" size={size}>
            <StyledCircle size={size} />
            <StyledCircleFiller size={size} state={state} />
          </StyledProgressCircle>
        );
    }
  }
}
