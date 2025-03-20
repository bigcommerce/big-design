import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StatusMessageProps } from './StatusMessage';

export const StyledStatusMessage = styled.div<Omit<StatusMessageProps, 'message'>>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({ theme, size }) =>
    size === 'panel' &&
    css`
      gap: ${theme.spacing.medium};
      padding-block: ${theme.spacing.large};
    `}
  ${({ theme, size }) =>
    size === 'page' &&
    css`
      gap: ${theme.spacing.xLarge};
      padding-block: ${theme.spacing.xxxLarge};
    `}
`;

StyledStatusMessage.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
  size: 'panel',
};

export const StatusMessageIllustration = styled.figure<Omit<StatusMessageProps, 'message'>>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin: 0;

  ${({ theme, size }) =>
    size === 'page' &&
    css`
      transform: scale(1.5);
      transform-origin: bottom;
      margin-block-start: ${theme.helpers.remCalc(60)};
    `}

  ${({ variant }) =>
    (variant === '404' || variant === 'info' || variant === 'search') &&
    css`
      background-image: radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%);
    `}

  ${({ variant }) =>
    (variant === 'unauthorized' || variant === 'warning') &&
    css`
      background-image: radial-gradient(circle at center top, #efc879 0%, #fefbf2 100%);
    `}

  ${({ variant }) =>
    (variant === 'error' || variant === 'server-error') &&
    css`
      background-image: radial-gradient(circle at center top, #ebb2ca 0%, #eee8fa 100%);
    `}

  ${({ variant }) =>
    variant === 'success' &&
    css`
      background-image: radial-gradient(circle at center top, #78e4a3 0%, #f3fdec 100%);
    `}
`;

StatusMessageIllustration.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
  size: 'panel',
};

export const StyledStatusMessageIcons = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;
StyledStatusMessageIcons.defaultProps = {
  theme: defaultTheme,
};

export const StyledStatusMessagePatterns = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  overflow: hidden;
`;
StyledStatusMessagePatterns.defaultProps = {
  theme: defaultTheme,
};
