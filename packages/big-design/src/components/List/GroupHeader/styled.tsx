import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledGroupHeader = styled.li<React.HTMLProps<HTMLLIElement>>`
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary50};
  cursor: default;
  display: flex;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  height: ${({ theme }) => theme.helpers.remCalc(36)};
  justify-content: space-between;
  min-width: ${({ theme }) => theme.helpers.remCalc(256)};
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.medium};

  &:not(:first-child) {
    margin-top: ${({ theme }) => theme.spacing.medium};
  }
`;

StyledGroupHeader.defaultProps = { theme: defaultTheme };
