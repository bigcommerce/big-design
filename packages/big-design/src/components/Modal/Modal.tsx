import { CloseIcon } from '@bigcommerce/big-design-icons';
import React from 'react';
import { createPortal } from 'react-dom';

import { uniqueId } from '../../utils';
import { Button } from '../Button';
import { H2 } from '../Typography';
import { HeadingProps } from '../Typography/Typography';

import {
  StyledModal,
  StyledModalActions,
  StyledModalBody,
  StyledModalClose,
  StyledModalContent,
  StyledModalHeader,
} from './styled';

export interface ModalProps {
  backdrop: boolean;
  isOpen: boolean;
  closeOnClickOutside: boolean;
  closeOnEscKey: boolean;
  variant: 'modal' | 'dialog';
  onClose(): void;
}

export interface ModalActionsProps {
  withBorder?: boolean;
}

export interface ModalHeaderProps {
  withBorder?: boolean;
}

const ModalActions: React.FC<ModalActionsProps> = ({ children, withBorder }) => (
  <StyledModalActions justifyContent="flex-end" withBorder={withBorder}>
    {children}
  </StyledModalActions>
);

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, withBorder }) => {
  return (
    <StyledModalHeader withBorder={withBorder}>
      {typeof children === 'string' ? <H2 margin="none">{children}</H2> : children}
    </StyledModalHeader>
  );
};

export class Modal extends React.PureComponent<ModalProps> {
  static defaultProps: Partial<ModalProps> = {
    backdrop: true,
    isOpen: false,
    closeOnClickOutside: false,
    closeOnEscKey: true,
    onClose: () => null,
    variant: 'modal',
  };

  static Actions = ModalActions;
  static Body = StyledModalBody;
  static Header = ModalHeader;
  readonly state = { initialBodyOverflowY: '' };

  private modalContainer?: HTMLDivElement;
  private modalRef = React.createRef<HTMLDivElement>();
  private readonly headerUniqueId = uniqueId('modal_header_');

  componentDidMount() {
    this.modalContainer = document.createElement('div');
    document.body.appendChild(this.modalContainer);
  }

  componentWillUnmount() {
    if (this.modalContainer) {
      document.body.removeChild(this.modalContainer);
    }

    document.body.style.overflowY = this.state.initialBodyOverflowY;
  }

  componentDidUpdate(prevProps: ModalProps) {
    // Check that the previous state was not open and is now open before auto focusing on modal
    if (!prevProps.isOpen && this.props.isOpen) {
      this.autoFocus();
      this.setState({ initialBodyOverflowY: document.body.style.overflowY });
    }

    this.props.isOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = this.state.initialBodyOverflowY);
  }

  render() {
    const { backdrop, isOpen, variant } = this.props;

    const modalContent = (
      <StyledModal
        onKeyDown={this.onKeyDown}
        onClick={this.onClickAway}
        ref={this.modalRef}
        backdrop={backdrop}
        variant={variant}
      >
        <StyledModalContent variant={variant} aria-labelledby={this.headerUniqueId} flexDirection="column">
          {this.renderClose()}
          {this.renderChildren()}
        </StyledModalContent>
      </StyledModal>
    );

    return isOpen && this.modalContainer ? createPortal(modalContent, this.modalContainer) : null;
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

  private renderChildren() {
    const { children } = this.props;

    return React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === Modal.Header) {
        return React.cloneElement(child as React.ReactElement<HeadingProps>, {
          id: this.headerUniqueId,
        });
      }

      return child;
    });
  }

  private autoFocus = () => {
    if (this.props.isOpen && this.modalRef.current) {
      this.modalRef.current.focus();
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
