import React from 'react';

import { StyledProgressBar, StyledProgressBarFiller } from './styled';

export interface ProgressBarProps {
  percent?: number;
  state?: 'incomplete' | 'indeterminant';
}

export class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps: ProgressBarProps = {
    state: 'indeterminant',
  };

  render() {
    const { percent, state } = this.props;

    switch (state) {
      case 'incomplete':
        return (
          <StyledProgressBar
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={percent ? percent : 0}
            role="progressbar"
          >
            <StyledProgressBarFiller state={state} percent={percent} />
          </StyledProgressBar>
        );
      case 'indeterminant':
        return (
          <StyledProgressBar role="progressbar">
            <StyledProgressBarFiller state={state} />
          </StyledProgressBar>
        );
    }
  }
}
