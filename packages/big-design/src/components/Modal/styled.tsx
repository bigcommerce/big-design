import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';
import { Flex } from '../Flex';

import { ModalProps } from './Modal';

export const StyledModal = styled.div.attrs({
  'aria-modal': true,
  role: 'dialog',
  tabIndex: -1,
})<Partial<ModalProps>>`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;

  ${props =>
    props.backdrop &&
    props.variant &&
    css`
      background: ${({ theme }, { variant } = props) =>
        rgba(theme.colors.secondary70, variant === 'dialog' ? 0.5 : 0.7)};
    `}
`;

export const StyledModalContent = styled(Flex)<{ variant: ModalProps['variant'] }>`
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  position: fixed;

  ${({ variant }) =>
    variant === 'dialog' &&
    css`
      ${({ theme }) => theme.elevation.floating};

      max-width: ${({ theme }) => theme.breakpointValues.tablet};
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
    `}

  ${({ variant }) =>
    variant === 'modal' &&
    css`
      height: 100%;
      width: 100%;

      ${({ theme }) => theme.breakpoints.tablet} {
        ${({ theme }) => theme.elevation.floating};

        height: auto;
        left: 50%;
        max-height: 664px;
        max-width: ${({ theme }) => theme.breakpointValues.tablet};
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;

export const StyledModalActions = styled(Flex)``;

export const StyledModalClose = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xxSmall};
  right: ${({ theme }) => theme.spacing.xxSmall};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

export const StyledModalBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

StyledModal.defaultProps = { theme: defaultTheme };
StyledModalContent.defaultProps = { theme: defaultTheme };
StyledModalActions.defaultProps = { theme: defaultTheme };
StyledModalClose.defaultProps = { theme: defaultTheme };
