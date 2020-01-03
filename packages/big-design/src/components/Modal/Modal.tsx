import { CloseIcon } from '@bigcommerce/big-design-icons';
import focusTrap, { FocusTrap } from 'focus-trap';
import React from 'react';
import { createPortal } from 'react-dom';

import { uniqueId } from '../../utils';
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
  backdrop: boolean;
  closeOnClickOutside: boolean;
  closeOnEscKey: boolean;
  header?: string;
  isOpen: boolean;
  variant: 'modal' | 'dialog';
  onClose(): void;
}

interface ModalState {
  initialBodyOverflowY: string;
  modalContainer: HTMLDivElement | null;
}

export interface ModalAction extends Omit<ButtonProps, 'children'> {
  text?: string;
}

export class Modal extends React.PureComponent<ModalProps, ModalState> {
  static defaultProps: Partial<ModalProps> = {
    backdrop: true,
    closeOnClickOutside: false,
    closeOnEscKey: true,
    isOpen: false,
    onClose: () => null,
    variant: 'modal',
  };

  readonly state: ModalState = {
    initialBodyOverflowY: '',
    modalContainer: null,
  };

  private focusTrap: FocusTrap | null = null;
  private modalRef = React.createRef<HTMLDivElement>();
  private previousFocus = typeof document !== 'undefined' ? document.activeElement : null;
  private readonly headerUniqueId = uniqueId('modal_header_');

  componentDidMount() {
    const modalContainer = document.createElement('div');

    document.body.appendChild(modalContainer);
    this.setState({ modalContainer });
  }

  componentWillUnmount() {
    const { initialBodyOverflowY, modalContainer } = this.state;

    if (modalContainer) {
      document.body.removeChild(modalContainer);
    }

    document.body.style.overflowY = initialBodyOverflowY;

    this.returnFocus();
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (this.modalRef.current && !this.focusTrap) {
      this.focusTrap = focusTrap(this.modalRef.current as HTMLElement, { initialFocus: this.modalRef.current });
    }

    // Check that the previous state was not open and is now open before auto focusing on modal
    if (!prevProps.isOpen && this.props.isOpen) {
      this.setState({ initialBodyOverflowY: document.body.style.overflowY || '' });
    }

    if (this.props.isOpen) {
      document.body.style.overflowY = 'hidden';
      this.focusTrap?.activate();
    } else {
      document.body.style.overflowY = this.state.initialBodyOverflowY;
      this.focusTrap?.deactivate();
      this.focusTrap = null;
    }
  }

  render() {
    const { backdrop, children, isOpen, variant } = this.props;
    const { modalContainer } = this.state;

    if (!(isOpen && modalContainer)) {
      return null;
    }

    const modalContent = (
      <StyledModal
        backdrop={backdrop}
        onClick={this.onClickAway}
        onKeyDown={this.onKeyDown}
        ref={this.modalRef}
        variant={variant}
        tabIndex={-1}
      >
        <StyledModalContent variant={variant} aria-labelledby={this.headerUniqueId} flexDirection="column">
          {this.renderClose()}
          {this.renderHeader()}
          <StyledModalBody>{children}</StyledModalBody>
          {this.renderActions()}
        </StyledModalContent>
      </StyledModal>
    );

    return createPortal(modalContent, modalContainer);
  }

  private renderClose() {
    const { onClose, variant } = this.props;

    return (
      variant === 'modal' && (
        <StyledModalClose>
          <Button onClick={onClose} iconOnly={<CloseIcon title="Close" />} variant="subtle" />
        </StyledModalClose>
      )
    );
  }

  private renderHeader() {
    const { header } = this.props;

    return (
      header &&
      typeof header === 'string' && (
        <StyledModalHeader id={this.headerUniqueId}>
          <H2 margin="none">{header}</H2>
        </StyledModalHeader>
      )
    );
  }

  private renderActions() {
    const { actions } = this.props;

    return (
      Array.isArray(actions) && (
        <StyledModalActions justifyContent="flex-end">
          {actions.map(({ text, ...props }, index) => (
            <Button key={index} {...props}>
              {text}
            </Button>
          ))}
        </StyledModalActions>
      )
    );
  }

  private returnFocus = () => {
    const previousFocus = this.previousFocus as HTMLElement;

    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  };

  private onClickAway = (event: React.MouseEvent) => {
    if (this.props.closeOnClickOutside && this.modalRef.current === event.target) {
      this.props.onClose();
    }
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    if (this.props.closeOnEscKey && event.key === 'Escape') {
      this.props.onClose();
    }
  };
}
