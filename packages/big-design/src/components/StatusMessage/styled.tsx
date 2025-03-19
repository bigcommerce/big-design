import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StatusMessageProps } from './StatusMessage';
import { StatusMessageIconProps } from './StatusMessageIcons';

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

  ${({ theme, variant }) =>
    (variant === '404' || variant === 'info' || variant === 'search') &&
    css`
      background-image: radial-gradient(
        circle at center top,
        ${theme.colors.primaryGradientStart} 0%,
        ${theme.colors.primaryGradientEnd} 100%
      );
    `}

  ${({ theme, variant }) =>
    (variant === 'unauthorized' || variant === 'warning') &&
    css`
      background-image: radial-gradient(
        circle at center top,
        ${theme.colors.warningGradientStart} 0%,
        ${theme.colors.warningGradientEnd} 100%
      );
    `}

  ${({ theme, variant }) =>
    (variant === 'error' || variant === 'server-error') &&
    css`
      background-image: radial-gradient(
        circle at center top,
        ${theme.colors.dangerGradientStart} 0%,
        ${theme.colors.dangerGradientEnd} 100%
      );
    `}

  ${({ theme, variant }) =>
    variant === 'success' &&
    css`
      background-image: radial-gradient(
        circle at center top,
        ${theme.colors.successGradientStart} 0%,
        ${theme.colors.successGradientEnd} 100%
      );
    `}
`;

StatusMessageIllustration.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
  size: 'panel',
};

export const StyledStatusMessageIcons = styled.div<StatusMessageIconProps>`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  svg {
    position: absolute;
  }

  ${({ variant }) =>
    variant === '404' &&
    css`
      svg {
        left: 0px;
      }
    `}

  ${({ variant }) =>
    variant === 'error' &&
    css`
      svg {
        left: -480px;
      }
    `}

  ${({ variant }) =>
    variant === 'info' &&
    css`
      svg {
        left: -240px;
      }
    `}

    ${({ variant }) =>
    variant === 'search' &&
    css`
      svg {
        left: -120px;
      }
    `}

    ${({ variant }) =>
    variant === 'server-error' &&
    css`
      svg {
        left: -360px;
      }
    `}

    ${({ variant }) =>
    variant === 'success' &&
    css`
      svg {
        left: -840px;
      }
    `}

    ${({ variant }) =>
    variant === 'unauthorized' &&
    css`
      svg {
        left: -600px;
      }
    `}

    ${({ variant }) =>
    variant === 'warning' &&
    css`
      svg {
        left: -720px;
      }
    `}
`;
StyledStatusMessageIcons.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
};

export const StyledStatusMessagePatterns = styled.div<StatusMessageIconProps>`
  position: absolute;
  width: 120px;
  height: 120px;
  overflow: hidden;
  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  ${({ variant }) =>
    (variant === 'error' || variant === 'server-error') &&
    css`
      svg {
        left: -120px;
      }
    `}
`;
StyledStatusMessagePatterns.defaultProps = {
  theme: defaultTheme,
  variant: 'info',
};
