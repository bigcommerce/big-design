import { addValues } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledButton = styled.button`
  align-items: center;
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  flex: none;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  height: ${({ theme }) => addValues(theme.spacing.xxLarge, theme.spacing.xxSmall)};
  justify-content: center;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary20};
  }
`;
