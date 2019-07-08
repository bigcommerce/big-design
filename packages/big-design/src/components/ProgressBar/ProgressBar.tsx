import React from 'react';

import { StyledFillerLinear, StyledProgressBarLinear } from './styled';

export interface ProgressBarProps {
  behavior?: 'determinant' | 'indeterminant';
  percent?: number;
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    behavior: 'determinant',
    percent: 0,
  };

  render() {
    const { behavior, percent } = this.props;

    return (
      <StyledProgressBarLinear>
        <StyledFillerLinear behavior={behavior} percent={percent} />
      </StyledProgressBarLinear>
    );
  }
}
