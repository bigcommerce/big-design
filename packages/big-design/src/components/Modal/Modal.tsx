import { CloseIcon } from '@bigcommerce/big-design-icons';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { typedMemo } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { MessagingButton } from '../Button/private';
import { H2 } from '../Typography';

import {
  StyledModal,
  StyledModalActions,
  StyledModalBody,
  StyledModalClose,
  StyledModalContent,
  StyledModalHeader,
} from './styled';

export interface ModalProps {
  actions?: ModalAction[];
  backdrop?: boolean;
  children?: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEscKey?: boolean;
  header?: string;
  isOpen?: boolean;
  variant?: 'modal' | 'dialog';
  onClose?(): void;
}

export interface ModalAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export const Modal: React.FC<ModalProps> = typedMemo((props) => {
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.createElement('div');

    document.body.appendChild(container);
    setModalContainer(container);
  }, []);

  useEffect(() => {
    return () => {
      if (modalContainer) {
        document.body.removeChild(modalContainer);
      }
    };
  }, [modalContainer]);

  return props.isOpen && modalContainer
    ? createPortal(<InternalModal {...props} />, modalContainer)
    : null;
});

const InternalModal: React.FC<ModalProps> = ({
  actions,
  backdrop = true,
  children,
  closeOnClickOutside = false,
  closeOnEscKey = true,
  header,
  onClose = () => null,
  variant = 'modal',
}) => {
  const initialBodyOverflowYRef = useRef('');
  const internalTrap = useRef<FocusTrap | null>(null);
  const headerUniqueId = useId();
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);

  const onClickAway = (event: React.MouseEvent) => {
    if (closeOnClickOutside && modalRef === event.target) {
      onClose();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (closeOnEscKey && event.key === 'Escape') {
      onClose();
    }
  };

  // Disable scroll on body when modal is open
  useEffect(() => {
    initialBodyOverflowYRef.current = document.body.style.overflowY || '';
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = initialBodyOverflowYRef.current;
    };
  }, []);

  // Setup focus-trap
  useEffect(() => {
    if (modalRef && internalTrap.current === null) {
      internalTrap.current = createFocusTrap(modalRef, {
        allowOutsideClick: (event) => {
          const target = event.target;

          // Allow clicks on portaled menu/listbox elements (e.g., Dropdown, Select)
          /* istanbul ignore next */
          if (target instanceof Element) {
            return (
              target.closest('[role="menu"]') !== null ||
              target.closest('[role="listbox"]') !== null
            );
          }

          return false;
        },
        fallbackFocus: modalRef,
      });
      internalTrap.current.activate();
    }

    return () => {
      internalTrap.current?.deactivate();
    };
  }, [internalTrap, modalRef]);

  const renderedClose = useMemo(
    () =>
      variant === 'modal' && (
        <StyledModalClose>
          <MessagingButton iconOnly={<CloseIcon title="Close" />} onClick={onClose} />
        </StyledModalClose>
      ),
    [onClose, variant],
  );

  const renderedHeader = useMemo(
    () =>
      header &&
      typeof header === 'string' && (
        <StyledModalHeader id={headerUniqueId}>
          <H2 margin="none">{header}</H2>
        </StyledModalHeader>
      ),
    [header, headerUniqueId],
  );

  const renderedActions = useMemo(
    () =>
      Array.isArray(actions) && (
        <StyledModalActions justifyContent="flex-end">
          {actions.map(({ text, onClick, ...props }, index) => (
            <Button
              key={index}
              {...props}
              onClick={(event) => {
                internalTrap.current?.deactivate();

                if (typeof onClick === 'function') {
                  onClick(event);
                }
              }}
            >
              {text}
            </Button>
          ))}
        </StyledModalActions>
      ),
    [actions],
  );

  return (
    <StyledModal
      backdrop={backdrop}
      onClick={onClickAway}
      onKeyDown={onKeyDown}
      ref={setModalRef}
      tabIndex={-1}
      variant={variant}
    >
      <StyledModalContent aria-labelledby={headerUniqueId} flexDirection="column" variant={variant}>
        {renderedClose}
        {renderedHeader}
        <StyledModalBody>{children}</StyledModalBody>
        {renderedActions}
      </StyledModalContent>
    </StyledModal>
  );
};
