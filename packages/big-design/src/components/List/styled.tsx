import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

interface StyledList {
  isOpen?: boolean;
  maxHeight?: number;
}

export const StyledList = styled.ul<StyledList>`
  ${({ theme }) => theme.shadow.raised};

  ${props => !props.isOpen && hideVisually()}

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
