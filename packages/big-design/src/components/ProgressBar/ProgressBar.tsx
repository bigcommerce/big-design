import React from 'react';

import { StyledProgressBar, StyledProgressBarFiller } from './styled';

export interface ProgressBarProps {
  percent?: number;
  status?: 'incomplete' | 'indeterminant';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    status: 'indeterminant',
  };

  render() {
    const { percent, status } = this.props;

    return (
      <>
        {status === 'incomplete' ? (
          <StyledProgressBar
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent ? percent : 0}
            role="progressbar"
          >
            <StyledProgressBarFiller status={status} percent={percent} />
          </StyledProgressBar>
        ) : (
          <StyledProgressBar role="progressbar">
            <StyledProgressBarFiller status={status} />
          </StyledProgressBar>
        )}
      </>
    );
  }
}
