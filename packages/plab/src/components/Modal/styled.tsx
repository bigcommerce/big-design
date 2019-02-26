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
    css`
      background: ${({ theme }) => rgba(theme.colors.secondary60, 0.8)};
    `}
`;

export const StyledModalContent = styled.div<Partial<ModalProps>>`
  ${({ theme }) => theme.elevation.floating};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xLarge};
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledModalActions = styled(Flex).attrs({
  flexDirection: 'row',
  justifyContent: 'flex-end',
})``;

StyledModal.defaultProps = { theme: defaultTheme };
StyledModalContent.defaultProps = { theme: defaultTheme };
StyledModalActions.defaultProps = { theme: defaultTheme };
