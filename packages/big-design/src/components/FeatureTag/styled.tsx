import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledFeatureTag = styled.a`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary20};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  display: inline-flex;
  color: ${({ theme }) => theme.colors.secondary60};
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.secondary60};
  flex-wrap: nowrap;
  font-size: ${({ theme }) => theme.helpers.remCalc(14)};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  justify-content: center;
  line-height: ${({ theme }) => theme.helpers.remCalc(20)};
  max-width: fit-content;
  outline: none;
  padding-block: calc(${({ theme }) => theme.spacing.xSmall} / 4);
  padding-inline: ${({ theme }) => theme.spacing.xSmall};
  text-decoration: none;
  user-select: none;

  &.active {
    background-color: ${({ theme }) => theme.colors.primary10};
    color: ${({ theme }) => theme.colors.primary50};
    fill: ${({ theme }) => theme.colors.primary};
  }

  &:hover,
  &.active:hover {
    background-color: ${({ theme }) => theme.colors.primary20};
    color: ${({ theme }) => theme.colors.primary60};
    fill: ${({ theme }) => theme.colors.primary40};
  }

  &:focus {
    outline: 4px solid ${({ theme }) => theme.colors.primary20};
  }

  &:active,
  &.active:active {
    background-color: ${({ theme }) => theme.colors.primary30};
    color: ${({ theme }) => theme.colors.primary60};
    fill: ${({ theme }) => theme.colors.primary70};
  }

  &:focused:active {
    background-color: ${({ theme }) => theme.colors.primary10};
    color: ${({ theme }) => theme.colors.primary60};
    fill: ${({ theme }) => theme.colors.primary60};
    outline: 4px solid ${({ theme }) => theme.colors.primary30};
  }
`;

StyledFeatureTag.defaultProps = { theme: defaultTheme };

export const StyledFeatureTagIcon = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  height: ${({ theme }) => theme.helpers.remCalc(18)};
  justify-content: center;
  overflow: hidden;
  width: ${({ theme }) => theme.helpers.remCalc(18)};

  & > svg {
    transform: scale(0.75);
    transform-origin: center;
  }
`;

StyledFeatureTagIcon.defaultProps = { theme: defaultTheme };

export const StyledFeatureTagLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
