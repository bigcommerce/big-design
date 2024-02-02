import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

export const StyledButton = styled.button<{ isActive: boolean; isIconType: boolean }>`
  align-items: center;
  appearance: none;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary20 : theme.colors.white};
  border: 1px solid
    ${({ theme, isActive }) => (isActive ? theme.colors.primary30 : theme.colors.secondary30)};
  border-radius: 0;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primary60 : theme.colors.secondary60)};
  cursor: pointer;
  flex: none;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  justify-content: center;
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  outline: none;
  padding: ${({ theme }) => `0 ${theme.spacing.medium}`};
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;

  margin-right: -1px;

  &:last-of-type {
    margin-right: 0;
  }

  &:focus {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
    z-index: 999;
  }

  ${({ isActive, theme }) =>
    isActive
      ? `
    z-index: 1;
    `
      : `
    &:hover {
      background-color: ${theme.colors.secondary10};
    }
    `}

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.normal};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
  }

  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.normal};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
  }

  &[disabled] {
    border-color: ${({ theme }) => theme.colors.secondary30};
    pointer-events: none;
    ${({ theme }) =>
      `
      background-color: ${theme.colors.secondary10};
      color: ${theme.colors.secondary50}
    `}
  }

  ${({ isIconType }) =>
    isIconType &&
    `
    display: flex;
    width: 36px;
    height: 36px;
    padding: 0;
    align-items: center;
`}
`;

StyledButton.defaultProps = { theme: defaultTheme };
