import { css } from 'styled-components';

const TextStyles = css`
  color: ${({ theme }) => theme.colors.secondary70};
  margin: ${({ theme }) => theme.spacing.xSmall};
`;

export const H0Styles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraLight};
  line-height: ${({ theme }) => theme.lineHeight.xxxLarge};
`;

export const H1Styles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xxLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  line-height: ${({ theme }) => theme.lineHeight.xxLarge};
`;

export const H2Styles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.xLarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
`;

export const H3Styles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.large};
`;

export const H4Styles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.medium};
`;

export const PStyles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
`;

export const SmallStyles = css`
  ${TextStyles};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.small};
`;
