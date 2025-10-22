import { Modifier, Obj, Placement } from '@popperjs/core';
import { OffsetModifier } from '@popperjs/core/lib/modifiers/offset';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { excludeMarginProps } from '../../helpers';
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
  readonly anchorElement: Element | null;
  readonly children?: React.ReactNode;
  readonly closeOnClickOutside?: boolean;
  readonly closeOnEscKey?: boolean;
  readonly isOpen: boolean;
  readonly label: string;
  readonly matchAnchorElementWidth?: boolean;
  readonly skidding?: number;
  readonly distance?: number;
  onClose?(): void;
  readonly placement?: Placement;
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

  const popperModifiers = useMemo<[Partial<OffsetModifier>, Modifier<unknown, Obj>]>(
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
      },
    ],
    [skidding, distance, matchAnchorElementWidth],
  );

  const { styles, attributes } = usePopper(anchorElement, popperElement, {
    modifiers: popperModifiers,
    placement,
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
      {...attributes.popper}
      id={id}
      ref={setPopperElement}
      style={styles.popper}
    >
      {children}
    </Box>
  );
};
