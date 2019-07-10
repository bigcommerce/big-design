import React from 'react';

import { StyledFillerLinear, StyledProgressBarLinear } from './styled';

export interface ProgressBarProps {
  percent?: number;
  variant?: 'determinant' | 'indeterminant';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    variant: 'determinant',
  };

  render() {
    const { percent, variant } = this.props;

    return (
      <>
        {variant === 'determinant' ? (
          <StyledProgressBarLinear
            role="progressbar"
            aria-valuenow={percent ? percent : 0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <StyledFillerLinear variant={variant} percent={percent} />
          </StyledProgressBarLinear>
        ) : (
          <StyledProgressBarLinear role="progressbar">
            <StyledFillerLinear variant={variant} />
          </StyledProgressBarLinear>
        )}
      </>
    );
  }
}
