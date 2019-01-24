import styled, { css } from 'styled-components';

import { defaultTheme } from '../../theme';

const CommonTextStyles = css`
  color: ${({ theme }) => theme.colors.secondary70};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};
`;

export const H0Styles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraLight};
  line-height: ${({ theme }) => theme.lineHeight.xxxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
`;

export const H1Styles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  line-height: ${({ theme }) => theme.lineHeight.xxLarge};
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
`;

export const H2Styles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
`;

export const H3Styles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.large};
  margin: 0 0 ${({ theme }) => theme.spacing.small};
`;

export const H4Styles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.xSmall};
`;

export const TextStyles = css`
  ${CommonTextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SmallStyles = css`
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

export const StyledH0 = styled.h1`
  ${H0Styles};
`;

export const StyledH1 = styled.h1`
  ${H1Styles};
`;

export const StyledH2 = styled.h2`
  ${H2Styles};
`;

export const StyledH3 = styled.h3`
  ${H3Styles};
`;

export const StyledH4 = styled.h4`
  ${H4Styles};
`;

export const StyledText = styled.p`
  ${TextStyles}
`;

export const StyledSmall = styled.p`
  ${SmallStyles};
`;

StyledH0.defaultProps = { theme: defaultTheme };
StyledH1.defaultProps = { theme: defaultTheme };
StyledH2.defaultProps = { theme: defaultTheme };
StyledH3.defaultProps = { theme: defaultTheme };
StyledH4.defaultProps = { theme: defaultTheme };
StyledText.defaultProps = { theme: defaultTheme };
StyledSmall.defaultProps = { theme: defaultTheme };
