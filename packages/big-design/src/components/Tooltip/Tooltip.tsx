import React from 'react';
import { createPortal } from 'react-dom';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';

import { Small } from '../Typography';

import { StyledTooltip, StyledTooltipTrigger } from './styled';

export interface TooltipProps {
  placement: PopperProps['placement'];
  trigger: React.ReactChild;
  modifiers?: PopperProps['modifiers'];
  fullWidth?: boolean;
}

interface State {
  visible: boolean;
}

class RawTooltip extends React.PureComponent<TooltipProps, State> {
  static defaultProps: Partial<TooltipProps> = {
    placement: 'top',
  };

  state = {
    visible: false,
  };

  private tooltipContainer?: HTMLDivElement;

  componentDidMount() {
    this.tooltipContainer = document.createElement('div');
    document.body.appendChild(this.tooltipContainer);
  }

  componentWillUnmount() {
    if (this.tooltipContainer) {
      document.body.removeChild(this.tooltipContainer);
    }
  }

  render() {
    const { children, trigger, fullWidth } = this.props;

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
              fullWidth={fullWidth}
            >
              {trigger}
            </StyledTooltipTrigger>
          )}
        </Reference>
        {this.tooltipContainer
          ? createPortal(
              <Popper
                placement={this.props.placement}
                modifiers={{ offset: { offset: '0, 20' }, ...this.props.modifiers }}
              >
                {({ placement, ref, style }) =>
                  this.state.visible && (
                    <StyledTooltip ref={ref} style={style} data-placement={placement}>
                      {this.renderContent(children)}
                    </StyledTooltip>
                  )
                }
              </Popper>,
              this.tooltipContainer,
            )
          : null}
      </Manager>
    );
  }

  private renderContent = (content: React.ReactNode) => {
    return typeof content === 'string' ? <Small color="white">{content}</Small> : content;
  };

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

export const InternalTooltip: React.FC<TooltipProps> = props => <RawTooltip {...props} />;

export const Tooltip: React.FC<TooltipProps> = ({ fullWidth, ...restProps }) => <RawTooltip {...restProps} />;
