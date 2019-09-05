import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledChip = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary30};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.secondary};
  display: inline-flex;
  line-height: ${({ theme }) => theme.spacing.xLarge};
  margin: ${({ theme }) => theme.spacing.xxSmall};
  padding: ${({ theme }) => `0 ${theme.spacing.xSmall}`};
  z-index: 1;

  & svg {
    cursor: pointer;
    left: ${({ theme }) => theme.spacing.xxSmall};
    position: relative;
    top: ${({ theme }) => theme.spacing.xxSmall};
  }
`;

StyledChip.defaultProps = {
  theme: defaultTheme,
};
