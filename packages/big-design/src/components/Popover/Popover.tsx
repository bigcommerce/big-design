import { Modifier, Placement } from '@popperjs/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { useUniqueId } from '../../hooks';
import { excludeMarginProps } from '../../mixins';
import { Box, BoxProps } from '../Box';

// Margin can't be used with popper elements
type BoxPropsWithoutMargins = Omit<
  BoxProps,
  'margin' | 'marginBottom' | 'marginHorizontal' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginVertical'
>;

export interface PopoverProps extends BoxPropsWithoutMargins {
  anchorElement: Element | null;
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

export const Popover: React.FC<PopoverProps> = ({ anchorElement, children, isOpen, role = 'dialog', ...props }) => {
  const uniquePopoverId = useUniqueId('popover');
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

  const popperModifiers = useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
      {
        name: 'sameWidth',
        enabled: matchAnchorElementWidth,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn({ state }) {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect({ state }) {
          const element = state.elements.reference;

          if (element instanceof HTMLElement) {
            state.elements.popper.style.width = `${element.offsetWidth}px`;
          }
        },
      } as Modifier<unknown, unknown>,
    ],
    [skidding, distance, matchAnchorElementWidth],
  );

  const { styles, attributes } = usePopper(anchorElement, popperElement, {
    modifiers: popperModifiers,
    placement,
  });

  useEffect(() => {
    const prevFocus = previousFocus.current as HTMLElement;

    return () => {
      if (prevFocus && typeof prevFocus.focus === 'function') {
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

      onClose();
    };

    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [closeOnClickOutside, onClose, popperElement]);

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
      {...attributes.popper}
      id={id}
      ref={setPopperElement}
      style={styles.popper}
    >
      {children}
    </Box>
  );
};
