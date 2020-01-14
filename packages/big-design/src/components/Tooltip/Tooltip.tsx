import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';

import { typedMemo } from '../../utils';
import { Small } from '../Typography';

import { StyledTooltip, StyledTooltipTrigger } from './styled';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  placement: PopperProps['placement'];
  trigger: React.ReactChild;
  modifiers?: PopperProps['modifiers'];
  inline?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = typedMemo(
  ({ children, inline = true, modifiers, trigger, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipContainer, setTooltipContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      const container = document.createElement('div');

      document.body.appendChild(container);
      setTooltipContainer(container);
    }, []);

    useEffect(() => {
      return () => {
        if (tooltipContainer) {
          document.body.removeChild(tooltipContainer);
        }
      };
    }, [tooltipContainer]);

    const renderContent = useMemo(() => {
      return typeof children === 'string' ? <Small color="white">{children}</Small> : children;
    }, [children]);

    const hideTooltip = () => {
      setIsVisible(false);
    };

    const showTooltip = () => {
      setIsVisible(true);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <StyledTooltipTrigger
              inline={inline}
              onBlur={hideTooltip}
              onFocus={showTooltip}
              onKeyDown={onKeyDown}
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
              ref={ref}
            >
              {trigger}
            </StyledTooltipTrigger>
          )}
        </Reference>
        {tooltipContainer
          ? createPortal(
              <Popper
                placement={props.placement || 'top'}
                modifiers={{ offset: { offset: '0, 8' }, ...modifiers }}
                eventsEnabled={isVisible}
              >
                {({ placement, ref, style }) =>
                  isVisible && (
                    <StyledTooltip ref={ref} style={style} data-placement={placement}>
                      {renderContent}
                    </StyledTooltip>
                  )
                }
              </Popper>,
              tooltipContainer,
            )
          : null}
      </Manager>
    );
  },
);
