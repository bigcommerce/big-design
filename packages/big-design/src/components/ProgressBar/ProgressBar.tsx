import React from 'react';

import { StyledFillerLinear, StyledProgressBarLinear } from './styled';

export interface ProgressBarProps {
  percent?: number;
  type?: 'determinant' | 'indeterminant';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    percent: 0,
    type: 'determinant',
  };

  render() {
    const { percent, type } = this.props;

    return (
      <StyledProgressBarLinear>
        <StyledFillerLinear type={type} percent={percent} />
      </StyledProgressBarLinear>
    );
  }
}
