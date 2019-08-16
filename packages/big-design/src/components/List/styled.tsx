import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

interface StyledList {
  maxHeight?: number;
}

export const StyledList = styled.ul<StyledList>`
  ${({ theme }) => theme.shadow.raised};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary70};
  display: inline-block;
  margin: 0;
  max-height: ${({ theme, maxHeight }) => (maxHeight ? theme.helpers.remCalc(maxHeight) : '')};
  outline: none;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.spacing.xSmall} 0;
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

StyledList.defaultProps = { theme: defaultTheme };
