import { CheckCircleIcon, ErrorIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { CIRCLE_DIMENSIONS } from './constants';
import { StyledCircle, StyledCircleFiller, StyledProgressCircle, StyledText } from './styled';

export interface ProgressCircleProps {
  error?: boolean;
  percent?: number;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  static readonly defaultProps: Partial<ProgressCircleProps> = {
    size: 'medium',
  };

  render() {
    const { error } = this.props;

    return error ? this.renderError() : this.renderCircle();
  }

  getDimensions() {
    const { size } = this.props;

    return size ? CIRCLE_DIMENSIONS[size] : CIRCLE_DIMENSIONS.medium;
  }

  renderCircle() {
    const { percent, size } = this.props;

    if (typeof percent !== 'number') {
      return (
        <StyledProgressCircle role="progressbar" size={size}>
          <StyledCircle size={size} />
          <StyledCircleFiller size={size} />
        </StyledProgressCircle>
      );
    }

    if (percent === 100) {
      return this.renderSuccess();
    }

    return (
      <StyledProgressCircle
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        role="progressbar"
        size={size}
      >
        <StyledCircle size={size} />
        <StyledCircleFiller percent={percent} size={size} />
        {(size === 'large' || size === 'medium') && (
          <StyledText size={size}>{percent ? Math.floor(percent) : 0}%</StyledText>
        )}
      </StyledProgressCircle>
    );
  }

  renderError() {
    const { percent } = this.props;

    return (
      <ErrorIcon
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent ? percent : 0}
        aria-valuetext="Error"
        color="danger"
        role="progressbar"
        size={this.getDimensions()}
      />
    );
  }

  renderSuccess() {
    return (
      <CheckCircleIcon
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={100}
        color="success"
        role="progressbar"
        size={this.getDimensions()}
      />
    );
  }
}
