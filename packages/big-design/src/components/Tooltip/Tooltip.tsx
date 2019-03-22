import React from 'react';
import { createPortal } from 'react-dom';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';

import { StyledTooltip, StyledTooltipTrigger } from './styled';

export interface TooltipProps {
  placement: PopperProps['placement'];
  content: React.ReactChild;
}

interface State {
  visible: boolean;
}

export class Tooltip extends React.PureComponent<TooltipProps, State> {
  static defaultProps: Partial<TooltipProps> = {
    placement: 'top',
  };

  state = {
    visible: false,
  };

  private tooltipContainer = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.tooltipContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.tooltipContainer);
  }

  render() {
    const { children, content } = this.props;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <StyledTooltipTrigger
              onBlur={this.hideTooltip}
              onFocus={this.showTooltip}
              onKeyDown={this.onKeyDown}
              onMouseEnter={this.showTooltip}
              onMouseLeave={this.hideTooltip}
              ref={ref}
            >
              {children}
            </StyledTooltipTrigger>
          )}
        </Reference>
        {createPortal(
          <Popper placement={this.props.placement} modifiers={{ offset: { offset: '0, 8' } }}>
            {({ placement, ref, style }) =>
              this.state.visible && (
                <StyledTooltip ref={ref} style={style} data-placement={placement}>
                  {content}
                </StyledTooltip>
              )
            }
          </Popper>,
          this.tooltipContainer,
        )}
      </Manager>
    );
  }

  private hideTooltip = () => {
    this.setState({ visible: false });
  };

  private showTooltip = () => {
    this.setState({ visible: true });
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.setState({ visible: false });
    }
  };
}
