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
  ({ placement = 'top', trigger, modifiers, inline = true, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const [tooltipContainer, setTooltipContainer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
      setTooltipContainer(document.createElement('div'));
      document.body.appendChild(tooltipContainer as HTMLDivElement);

      return () => {
        document.body.removeChild(tooltipContainer as HTMLDivElement);
      };
    }, [tooltipContainer]);

    const renderContent = (content: React.ReactNode) => {
      return typeof content === 'string' ? <Small color="white">{content}</Small> : content;
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
              <Popper
                placement={placement}
                modifiers={{ offset: { offset: '0, 8' }, ...modifiers }}
                eventsEnabled={isVisible}
              >
                {({ ref, style }) =>
                  isVisible && (
                    <StyledTooltip ref={ref} style={style} data-placement={placement}>
                      {renderContent(children)}
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
