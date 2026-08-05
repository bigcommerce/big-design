import { autoUpdate, offset, shift, size, useFloating } from '@floating-ui/react';
import { Placement } from '@popperjs/core';
import React, { useEffect, useId, useRef, useState } from 'react';

import { excludeMarginProps } from '../../helpers';
import { getFloatingPlacement } from '../../utils';
import { Box, BoxProps } from '../Box';

// Margin can't be used with popper elements
type BoxPropsWithoutMargins = Omit<
  BoxProps,
  | 'margin'
  | 'marginBottom'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginVertical'
>;

export interface PopoverProps extends BoxPropsWithoutMargins {
  anchorElement: Element | null;
  children?: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEscKey?: boolean;
  isOpen: boolean;
  label: string;
  matchAnchorElementWidth?: boolean;
  skidding?: number;
  distance?: number;
  onClose?(): void;
  placement?: Placement;
}

export const Popover: React.FC<PopoverProps> = ({
  anchorElement,
  children,
  isOpen,
  role = 'dialog',
  ...props
}) => {
  const uniquePopoverId = useId();
  const rest = excludeMarginProps(props);

  useEffect(() => {
    if (!anchorElement) {
      return;
    }

    anchorElement.setAttribute('aria-controls', uniquePopoverId);
    anchorElement.setAttribute('aria-expanded', String(isOpen));
    anchorElement.setAttribute('aria-haspopup', role);
  }, [anchorElement, isOpen, role, uniquePopoverId]);

  return isOpen ? (
    <InternalPopover anchorElement={anchorElement} {...rest} id={uniquePopoverId}>
      {children}
    </InternalPopover>
  ) : null;
};

type InternalPopoverProps = Omit<PopoverProps, 'isOpen'>;

// We use an Internal component that mounts/unmounts on isOpen
// This facilitates running cleanups on some effects.
const InternalPopover: React.FC<InternalPopoverProps> = ({
  anchorElement,
  children,
  closeOnClickOutside = true,
  closeOnEscKey = true,
  id,
  label,
  matchAnchorElementWidth = false,
  skidding = 0,
  distance = 4,
  onClose = () => null,
  placement = 'auto',
  role,
  ...props
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const previousFocus = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  const { middleware: placementMiddleware, placement: floatingPlacement } =
    getFloatingPlacement(placement);

  const { floatingStyles } = useFloating({
    elements: { floating: popperElement, reference: anchorElement },
    middleware: [
      offset({ crossAxis: skidding, mainAxis: distance }),
      placementMiddleware,
      shift(),
      ...(matchAnchorElementWidth
        ? [
            size({
              apply({ elements, rects }) {
                elements.floating.style.width = `${rects.reference.width}px`;
              },
            }),
          ]
        : []),
    ],
    placement: floatingPlacement,
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const prevFocus = previousFocus.current;

    return () => {
      if (prevFocus instanceof HTMLElement) {
        prevFocus.focus();
      }
    };
  }, []);

  // Setup close on click outside
  useEffect(() => {
    if (typeof document === 'undefined' || !closeOnClickOutside) {
      return;
    }

    const clickHandler = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (popperElement?.contains(event.target)) {
        return;
      }

      if (anchorElement?.contains(event.target)) {
        return;
      }

      onClose();
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [anchorElement, closeOnClickOutside, onClose, popperElement]);

  // Setup close on Esc key
  useEffect(() => {
    if (typeof document === 'undefined' || !closeOnEscKey) {
      return;
    }

    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [closeOnEscKey, onClose]);

  return (
    <Box
      aria-label={label}
      backgroundColor="white"
      padding="medium"
      role={role}
      shadow="floating"
      tabIndex={-1}
      zIndex="popover"
      {...props}
      id={id}
      ref={setPopperElement}
      style={floatingStyles}
    >
      {children}
    </Box>
  );
};
