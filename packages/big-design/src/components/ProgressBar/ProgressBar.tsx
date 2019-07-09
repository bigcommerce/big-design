import React from 'react';

import { StyledFillerLinear, StyledProgressBarLinear } from './styled';

export interface ProgressBarProps {
  percent?: number;
  variant?: 'determinant' | 'indeterminant';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    percent: 0,
    variant: 'determinant',
  };

  render() {
    const { percent, variant } = this.props;

    return (
      <StyledProgressBarLinear>
        <StyledFillerLinear variant={variant} percent={percent} />
      </StyledProgressBarLinear>
    );
  }
}
