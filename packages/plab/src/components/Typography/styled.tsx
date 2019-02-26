import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';

const CommonTextStyles = css`
  color: ${({ theme }) => theme.colors.secondary70};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

export const StyledH0 = styled.h1`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraLight};
  line-height: ${({ theme }) => theme.lineHeight.xxxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledH1 = styled.h1`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  line-height: ${({ theme }) => theme.lineHeight.xxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledH2 = styled.h2`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
`;

export const StyledH3 = styled.h3`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.large};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
`;

export const StyledH4 = styled.h4`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xSmall};
`;

export const StyledText = styled.p`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledSmall = styled.p`
  ${CommonTextStyles};
  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
  margin: 0 0 ${({ theme }) => theme.spacing.small};

  &:last-child {
    margin-bottom: 0;
  }
`;

StyledH0.defaultProps = { theme: defaultTheme };
StyledH1.defaultProps = { theme: defaultTheme };
StyledH2.defaultProps = { theme: defaultTheme };
StyledH3.defaultProps = { theme: defaultTheme };
StyledH4.defaultProps = { theme: defaultTheme };
StyledText.defaultProps = { theme: defaultTheme };
StyledSmall.defaultProps = { theme: defaultTheme };
