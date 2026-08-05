import { autoUpdate, Middleware, offset, Placement, shift, useFloating } from '@floating-ui/react';
import React, { cloneElement, ComponentPropsWithoutRef, memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getFloatingPlacement } from '../../utils/floatingPlacement';
import { Small } from '../Typography';

import { StyledTooltip } from './styled';

type TooltipPlacement = Placement | 'auto' | 'auto-start' | 'auto-end';

export interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  placement?: TooltipPlacement;
  trigger: React.ReactElement;
  middleware?: Middleware[];
}

export const Tooltip: React.FC<TooltipProps> = memo(
  ({ children, middleware, trigger, id, placement = 'auto' }) => {
    const [isVisible, setIsVisible] = useState(false);

    const { middleware: placementMiddleware, placement: floatingPlacement } =
      getFloatingPlacement(placement);

    const {
      floatingStyles,
      refs,
      update,
      placement: resolvedPlacement,
    } = useFloating({
      middleware: middleware ?? [offset(4), placementMiddleware, shift()],
      placement: floatingPlacement,
    });

    // Only run autoUpdate while visible — matches popper's eventListeners { scroll, resize } behavior
    useEffect(() => {
      if (isVisible && refs.reference.current && refs.floating.current) {
        return autoUpdate(refs.reference.current, refs.floating.current, update);
      }
    }, [isVisible, refs.reference, refs.floating, update]);

    const renderContent = () => {
      return typeof children === 'string' ? <Small color="white">{children}</Small> : children;
    };

    const hideTooltip = () => setIsVisible(false);
    const showTooltip = () => setIsVisible(true);

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    return (
      <>
        {cloneElement(trigger, {
          ref: refs.setReference,
          onBlur: hideTooltip,
          onFocus: showTooltip,
          onKeyDown,
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
        })}
        {createPortal(
          isVisible && (
            <StyledTooltip
              data-placement={resolvedPlacement}
              id={id}
              ref={refs.setFloating}
              style={floatingStyles}
            >
              {renderContent()}
            </StyledTooltip>
          ),
          document.body,
        )}
      </>
    );
  },
);
