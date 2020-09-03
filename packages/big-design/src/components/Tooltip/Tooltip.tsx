import { Placement } from '@popperjs/core';
import React, { HTMLAttributes, memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';

import { Small } from '../Typography';

import { StyledTooltip, StyledTooltipTrigger } from './styled';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  placement: Placement;
  trigger: React.ReactChild;
  modifiers?: PopperProps<any>['modifiers'];
  inline?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = memo(({ children, inline = true, modifiers, trigger, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipContainer, setTooltipContainer] = useState<HTMLDivElement | null>(null);
  const tooltipModifiers = useMemo(() => {
    const mods = modifiers ? modifiers : [];

    return [
      { name: 'eventListeners', options: { scroll: isVisible, resize: isVisible } },
      { name: 'offset', options: { offset: [0, 4] } },
      ...mods,
    ];
  }, [isVisible, modifiers]);

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

  const renderContent = () => {
    return typeof children === 'string' ? <Small color="white">{children}</Small> : children;
  };

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
            <Popper placement={props.placement || 'top'} modifiers={tooltipModifiers}>
              {({ placement, ref, style }) =>
                isVisible && (
                  <StyledTooltip ref={ref} style={style} data-placement={placement}>
                    {renderContent()}
                  </StyledTooltip>
                )
              }
            </Popper>,
            tooltipContainer,
          )
        : null}
    </Manager>
  );
});
