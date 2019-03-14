import { rem } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { DropdownMenuProps } from './Menu';

export const StyledDropdownMenu = styled.ul<DropdownMenuProps>`
  ${({ theme }) => theme.elevation.raised};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary70};
  display: inline-block;
  margin: 0;
  max-height: ${props => (props.maxHeight ? rem(props.maxHeight) : 'none')};
  overflow-y: scroll;
  padding: ${({ theme }) => theme.spacing.xSmall} 0;
`;

StyledDropdownMenu.defaultProps = { theme: defaultTheme };
