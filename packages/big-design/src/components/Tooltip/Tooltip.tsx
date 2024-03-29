import { Placement } from '@popperjs/core';
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Manager, Popper, PopperProps, Reference } from 'react-popper';

import { Small } from '../Typography';

import { StyledTooltip } from './styled';

export interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  placement: Placement;
  trigger: React.ReactElement;
  modifiers?: PopperProps<any>['modifiers'];
}

export const Tooltip: React.FC<TooltipProps> = memo(
  ({ children, modifiers, trigger, id, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipContainer, setTooltipContainer] = useState<HTMLDivElement | null>(null);
    const tooltipModifiers = useMemo(() => {
      const mods = modifiers || [];

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
          {({ ref }) =>
            cloneElement(trigger, {
              ref,
              onBlur: hideTooltip,
              onFocus: showTooltip,
              onKeyDown,
              onMouseEnter: showTooltip,
              onMouseLeave: hideTooltip,
            })
          }
        </Reference>
        {tooltipContainer
          ? createPortal(
              <Popper modifiers={tooltipModifiers} placement={props.placement || 'top'}>
                {({ placement, ref, style }) =>
                  isVisible && (
                    <StyledTooltip data-placement={placement} id={id} ref={ref} style={style}>
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
  },
);
