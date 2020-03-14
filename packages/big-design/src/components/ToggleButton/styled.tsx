import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

interface StyledToggleButtonProps {
  selected: boolean;
}

export const StyledToggleButton = styled('button')<StyledToggleButtonProps>`
  background: ${({ selected, theme }) => (selected ? theme.colors.primary20 : theme.colors.white)};
  border: 1px solid ${({ selected, theme }) => (selected ? theme.colors.primary30 : theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary60 : theme.colors.secondary60)};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  line-height: ${({ theme }) => theme.lineHeight.xLarge};
  margin: 0;
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.medium};
  position: relative;

  &[disabled] {
    background: ${({ selected, theme }) => (selected ? theme.colors.secondary10 : theme.colors.white)};
    border: 1px solid ${({ theme }) => theme.colors.secondary30};
    color: ${({ theme }) => theme.colors.secondary40};
    cursor: not-allowed;
  }

  &:not([disabled]):hover,
  &:not([disabled]):active {
    background: ${({ selected, theme }) => (selected ? theme.colors.primary20 : theme.colors.primary10)};
    color: ${({ selected, theme }) => (selected ? theme.colors.primary60 : theme.colors.primary50)};
  }

  &:not([disabled]):focus {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary20};
  }
`;

StyledToggleButton.defaultProps = { theme: defaultTheme };
