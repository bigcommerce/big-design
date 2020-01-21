import { CheckCircleIcon, ErrorIcon } from '@bigcommerce/big-design-icons';
import React, { useMemo } from 'react';

import { typedMemo } from '../../utils';

import { CIRCLE_DIMENSIONS } from './constants';
import { StyledCircle, StyledCircleFiller, StyledProgressCircle, StyledText } from './styled';

export interface ProgressCircleProps {
  error?: boolean;
  percent?: number;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
}

export const ProgressCircle: React.FC<ProgressCircleProps> = typedMemo(({ error, percent, size = 'medium' }) => {
  const dimensions = CIRCLE_DIMENSIONS[size];

  const renderedError = useMemo(() => {
    return (
      <ErrorIcon
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent ? percent : 0}
        aria-valuetext="Error"
        color="danger"
        role="progressbar"
        size={dimensions}
      />
    );
  }, [percent, dimensions]);

  const renderedSuccess = useMemo(() => {
    return (
      <CheckCircleIcon
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={100}
        color="success"
        role="progressbar"
        size={dimensions}
      />
    );
  }, [dimensions]);

  const renderedCircle = useMemo(() => {
    if (typeof percent !== 'number') {
      return (
        <StyledProgressCircle role="progressbar" size={size}>
          <StyledCircle size={size} />
          <StyledCircleFiller size={size} />
        </StyledProgressCircle>
      );
    }

    if (percent === 100) {
      return renderedSuccess;
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
  }, [percent, size, renderedSuccess]);

  return error ? renderedError : renderedCircle;
});
