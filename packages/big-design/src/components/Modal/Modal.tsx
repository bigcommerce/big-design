import { CloseIcon } from '@bigcommerce/big-design-icons';
import focusTrap, { FocusTrap } from 'focus-trap';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { typedMemo, uniqueId } from '../../utils';
import { Button, ButtonProps } from '../Button';
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

export const Modal: React.FC<ModalProps> = typedMemo(
  ({
    actions,
    backdrop = true,
    children,
    closeOnClickOutside = false,
    closeOnEscKey = true,
    header,
    isOpen = false,
    onClose = () => null,
    variant = 'modal',
  }) => {
    const [internalTrap, setInternalTrap] = useState<FocusTrap | null>(null);
    const [initialBodyOverflowY, setInitialBodyOverflowY] = useState('');
    const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(null);
    const headerUniqueId = useMemo(() => uniqueId('modal_header_'), []);
    const modalRef = createRef<HTMLDivElement>();
    const previousFocus = typeof document !== 'undefined' ? document.activeElement : null;

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

        document.body.style.overflowY = initialBodyOverflowY;
        returnFocus();
      };
    }, [modalContainer]);

    useEffect(() => {
      if (modalRef.current && !internalTrap) {
        setInternalTrap(focusTrap(modalRef.current as HTMLElement, { initialFocus: modalRef.current }));
      }

      if (isOpen) {
        setInitialBodyOverflowY(document.body.style.overflowY || '');
        document.body.style.overflowY = 'hidden';
        internalTrap?.activate();
      } else {
        setInitialBodyOverflowY('');
        document.body.style.overflowY = initialBodyOverflowY;
        internalTrap?.deactivate();
        setInternalTrap(null);
      }
    }, [internalTrap, isOpen, modalRef]);

    const returnFocus = () => {
      const prevFocus = previousFocus as HTMLElement;

      if (prevFocus && typeof prevFocus.focus === 'function') {
        prevFocus.focus();
      }
    };

    const onClickAway = (event: React.MouseEvent) => {
      if (closeOnClickOutside && modalRef.current === event.target) {
        onClose();
      }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (closeOnEscKey && event.key === 'Escape') {
        onClose();
      }
    };

    const renderedClose = useMemo(
      () =>
        variant === 'modal' && (
          <StyledModalClose>
            <Button onClick={onClose} iconOnly={<CloseIcon title="Close" />} variant="subtle" />
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
            {actions.map(({ text, ...props }, index) => (
              <Button key={index} {...props}>
                {text}
              </Button>
            ))}
          </StyledModalActions>
        ),
      [actions],
    );

    const renderedContent = (
      <StyledModal
        backdrop={backdrop}
        onClick={onClickAway}
        onKeyDown={onKeyDown}
        ref={modalRef}
        variant={variant}
        tabIndex={-1}
      >
        <StyledModalContent variant={variant} aria-labelledby={headerUniqueId} flexDirection="column">
          {renderedClose}
          {renderedHeader}
          <StyledModalBody>{children}</StyledModalBody>
          {renderedActions}
        </StyledModalContent>
      </StyledModal>
    );

    return !(isOpen && modalContainer) ? null : createPortal(renderedContent, modalContainer);
  },
);
