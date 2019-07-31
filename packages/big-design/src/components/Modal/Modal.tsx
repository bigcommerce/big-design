import { CloseIcon } from '@bigcommerce/big-design-icons';
import React from 'react';
import { createPortal } from 'react-dom';

import { uniqueId } from '../../utils';
import { Button } from '../Button';
import { H2 } from '../Typography';
import { HeadingProps } from '../Typography/Typography';

import { StyledModal, StyledModalActions, StyledModalBody, StyledModalClose, StyledModalContent } from './styled';

export interface ModalProps {
  backdrop: boolean;
  isOpen: boolean;
  closeOnClickOutside: boolean;
  closeOnEscKey: boolean;
  variant: 'modal' | 'dialog';
  onClose(): void;
}

const ModalActions = ({ children }: { children: React.ReactNode }) => (
  <StyledModalActions justifyContent="flex-end" marginTop={{ mobile: 'medium', tablet: 'xxLarge' }}>
    {children}
  </StyledModalActions>
);

const ModalHeader = ({ children, ...props }: { children: string }) => {
  return typeof children === 'string' ? <H2 {...props}>{children}</H2> : null;
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

  private modalRef = React.createRef<HTMLDivElement>();
  private modalContainer = document.createElement('div');
  private readonly headerUniqueId = uniqueId('modal_header_');

  componentDidMount() {
    document.body.appendChild(this.modalContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalContainer);
  }

  componentDidUpdate(prevProps: ModalProps) {
    // Check that the previous state was not open and is now open before auto focusing on modal
    if (!prevProps.isOpen && this.props.isOpen) {
      this.autoFocus();
    }
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
        <StyledModalContent
          variant={variant}
          aria-labelledby={this.headerUniqueId}
          flexDirection="column"
          padding={{ mobile: 'medium', tablet: 'xxLarge' }}
        >
          {this.renderClose()}
          {this.renderChildren()}
        </StyledModalContent>
      </StyledModal>
    );

    return isOpen && createPortal(modalContent, this.modalContainer);
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
